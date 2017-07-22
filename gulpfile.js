const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const metalsmith  = require('gulp-metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const cleanCSS = require('gulp-clean-css');
const runSequence = require('run-sequence');
const imageminMozJpeg = require('imagemin-mozjpeg');
const imageminPngQuant = require('imagemin-pngquant');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const settings = require('./settings.js');

gulp.task('watch', () => 
    gulp.watch(settings.paths.src.base, ['build', browserSync.reload])
);

gulp.task('browser-sync', () => {
    browserSync.init({server:{ baseDir: settings.paths.dst.base }});
});

gulp.task('clean:build', () => 
    gulp.src(settings.paths.dst.base, {read: false})
        .pipe(clean())
);

gulp.task('sass', () =>
    gulp.src(settings.paths.src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(settings.paths.dst.styles))
);

gulp.task('images', () => 
    gulp.src(settings.paths.src.images)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imageminMozJpeg(),
            imageminPngQuant({quality:'85-100'}),
            imagemin.svgo({plugins: [{removeViewBox: false}]})
        ]))
        .pipe(gulp.dest(settings.paths.dst.images))
);

gulp.task('metalsmith', () => {
    gulp.src(settings.paths.src.content)
        .pipe(metalsmith({
            use: [
                markdown(),
                permalinks(),
                layouts(settings.metalsmith.layouts)
            ],
            metadata: settings.metalsmith.metadata,
        }))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(settings.paths.dst.base));
});

gulp.task('build', () => runSequence(
    'clean:build',
    ['metalsmith', 'sass', 'images']
));

gulp.task('serve', () => runSequence(
    'clean:build', 
    ['metalsmith', 'sass', 'images'],
    ['watch', 'browser-sync']
));

gulp.task('default', ['build']);

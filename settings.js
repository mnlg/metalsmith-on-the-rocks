settings = {
    paths: {
        src: {
            base: './src/**/*',
            content: './src/content/**',
            sass: './src/sass/**/*.scss',
            images: './src/img/**/*'
        },
        dst: {
            base: './build',
            images: './build/img',
            styles: './build/css'
        }
    },
    metalsmith: {
        metadata:  {
            title: "Metalsmith On The Rocks",
            description: "static site generator starter kit based on metalsmith",
            generator: "Mealsmith On The Rocks",
        },
        layouts: {
            engine: 'handlebars',
            directory: './src/templates'
        }
    }
};

module.exports = settings;
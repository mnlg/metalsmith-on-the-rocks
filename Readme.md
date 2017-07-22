# Metalsmith On the Rocks

## static site generator starter kit

_Metalsmith On the Rocks_ is a static site generator starter kit based on [Metalsmith](http://www.metalsmith.io).

It will transform your markdown files to html as well as compile the sass styles, optimize the images and minify the resulting html and css files.

_Metalsmith On the Rocks_ also includes a gulp task for development and content edition purposes, this task will run browser-sync to serve and reload your site when any change is made.

## Using Metalsmith On the Rocks

You'll need to clone this repo and run `npm install` to install the dependencies.

Then save your content markdown files in the `src/content` folder and run `gulp` to generate your site. The resulting site will be saved in the `build` folder, ready to be uploaded to your server.

If you need to use images you can save them in the `src/img` folder, they will be optimized and copied to the `build/img` folder.

You will probably want to create your own template, to do so save your html files in the `src/templates` folder and your sass files in `src/sass`. The default template engine is Handlebars.

In case you want to change the default paths or template engine you can do so in the `settings.js` file.

For development or content edition you can use the `gulp serve` task.

## Todo

Right now this gulp file suits my needs, however, there are a few things I will like to add:

* Javascript concatenation and minification
* Critical rendering path
* Improved default templates
* Improved logo

Pull requests are welcome.

## License

All code in this repository is released under the MIT public license.

http://opensource.org/licenses/MIT
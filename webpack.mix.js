const mix = require('laravel-mix');

mix.setPublicPath('./public');

mix.js('./src/js/app.js', './public/js/app.js');
mix.sass('./src/scss/main.scss', './public/css/styles.css');

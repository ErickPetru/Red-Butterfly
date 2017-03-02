const express = require('express');
const {join} = require('path');

/*
* Returns a middleware for serving static files.
*/

exports.publicServer = function () {
  return express.static('public');
}

/*
* Returns the Vue.js server middleware.
*/

exports.vueServer = function ({config}) {
  let isDev = config.env === 'development';

  if (isDev) { // development
    let {devServer} = require('express-vue-dev');
    return devServer({
      server: config.webpackServer(),
      client: config.webpackClient()
    });
  }
  else { // production
    let {bundleRenderer} = require('express-vue-builder');
    let bundlePath = join(__dirname, '..', '..', '..', 'dist', 'server', 'bundle.js');
    return [
      bundleRenderer(bundlePath), // register req.vue
      express.static('dist/client') // serve bundles from ./dist
    ];
  }
}

/*
* Returns a middleware which renders the Vue.js application.
*/

exports.appServer = function ({config}) {
  return (req, res) => {
    let {publicPath, env} = config;
    let isDev = env === 'development';
    let page = req.vue.renderToStream();

    res.write(`<!DOCTYPE html>`);
    page.on('init', () => {
      res.write(`<html lang="en">`);
      res.write(`<head>`);
      res.write(  `<meta charset="utf-8">`);
      res.write(  `<meta name="viewport" content="width=device-width, initial-scale=1">`);
      res.write(  `<title>Red Butterfly</title>`);
      res.write(  `<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">`);
      res.write(  `<link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">`);
      res.write(  `<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">`);
      res.write(  `<link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">`);
      res.write(  `<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">`);
      res.write(  `<link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">`);
      res.write(  `<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">`);
      res.write(  `<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">`);
      res.write(  `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">`);
      res.write(  `<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">`);
      res.write(  `<link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">`);
      res.write(  `<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">`);
      res.write(  `<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">`);
      res.write(  `<link rel="manifest" href="/manifest.json">`);
      res.write(  `<meta name="apple-mobile-web-app-title" content="Red Butterfly">`);
      res.write(  `<meta name="application-name" content="Red Butterfly">`);
      res.write(  `<meta name="msapplication-TileColor" content="#f03434">`);
      res.write(  `<meta name="msapplication-TileImage" content="/mstile-144x144.png">`);
      res.write(  `<meta name="theme-color" content="#f44336">`);
      res.write(  `<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500">`);
      res.write(  !isDev ? `<link href="${publicPath}bundle.css" rel='stylesheet' type='text/css'>` : '');
      res.write(`</head>`);
      res.write(`<body>`);
    });
    page.on('data', (chunk) => {
      res.write(chunk);
    });
    page.on('end', () => {
      res.write(  `<script src="${publicPath}bundle.js"></script>`);
      res.write(`</body>`);
      res.write(`</html>`);
      res.end();
    });
    page.on('error', function (error) {
      console.error(error);
      res.status(500).send('Server Error');
    });
  };
}

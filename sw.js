/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("/static/pwa/workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/static/pwa/workbox-v4.3.1"});

importScripts(
  "/static/pwa/precache-manifest.e58dd940f9cdfabbb8529c46862ea5d9.js"
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  whitelist: [/^static/,/^sw\.js$/,/^index\.html$/,/^favicon\.ico$/,/^\.gitignore$/,/^img/],
  
});

workbox.routing.registerRoute(/^https:\/\/.*.githubusercontent.com\//, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"github-content", plugins: [] }), 'GET');
workbox.routing.registerRoute(/^https:\/\/api.github.com\//, new workbox.strategies.NetworkFirst({ "cacheName":"github-api", plugins: [] }), 'GET');
workbox.routing.registerRoute(/.+/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"other-websites", plugins: [] }), 'GET');

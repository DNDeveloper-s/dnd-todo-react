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

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/precache-manifest.1ea04ce526293194a2ce7ee69cd35d12.js"
);

let CACHE_NAME = 'dndtodo-cache';
let urlsToCache = [
  '/',
  '/favicon.ico',
  '/logo.svg',
  '/asset-manifest.json',
  '/manifest.json',
  '/service-worker.js',
  '/index.html',
  '/static/js/2.34c7c98e.chunk.js',
  '/static/js/main.67dbddfe.chunk.js',
  '/static/js/runtime-main.817b1449.js',
  'http://localhost:5000/assets/images/def_user.png'
];

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache=> {
        return cache.addAll(urlsToCache);
      })
  )
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {

        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      )
    })
  )
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if(response) {
          console.log('[service-worker.js || Line no. 68 ....]', 'Found in cache');
          console.log(event.request);
          console.log(response);
          return response;
        }
        console.log('[service-worker.js || Line no. 73 ....]', 'Not found in cache, Calling network!');
        console.log(event.request);
        return fetch(event.request);
      })
  )
});

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {

  blacklist: [/^\/_/,/\/[^/?]+\.[^/]+$/],
});

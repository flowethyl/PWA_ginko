
var cacheName = 'ginko_cache';
	var appShellFiles = [
	  './ginko_cache',
	  './ginko_cache/index.html',
	  './ginko_cache/app.js',
	  './ginko_cache/style.css',
	  './ginko_cache/icons/favicon.ico',
	  './ginko_cache/icons/maskable_icon.png',
	  './ginko_cache/icons/icon-32.png',
	  './ginko_cache/icons/icon-64.png',
	  './ginko_cache/icons/icon-96.png',
	  './ginko_cache/icons/icon-128.png',
	  './ginko_cache/icons/icon-168.png',
	  './ginko_cache/icons/icon-192.png',
	  './ginko_cache/icons/icon-256.png',
	  './ginko_cache/icons/icon-512.png'
	];
	
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
	
	e.waitUntil(
		caches.open(cacheName).then((cache) => {
		console.log('[Service Worker] Caching all: app shell and content');
		return cache.addAll(appShellFiles)
		});
	};
});

self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request).then((r) => {
			console.log('[Service Worker] Fetching resource: '+e.request.url);
			return r || fetch(e.request).then((response) => {
					return caches.open(cacheName).then((cacbe) => {
				console.log('[Service Worker] Caching new resource: '+e.request.url);
				cache.put(e.request, response.clone());
				return response;
				});
			});
		})
	);
});

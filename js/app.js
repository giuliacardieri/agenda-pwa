(function() {
  'use strict';

if (navigator.serviceWorker.controller) {
  console.log('[Service worker] active service worker found, no need to register')
} else {
//Register the ServiceWorker
  navigator.serviceWorker.register('service-worker.js', {
    scope: './'
  }).then(function(reg) {
    console.log('Service worker has been registered for scope:'+ reg.scope);
  }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
  });
}

})();
const config = {
  rootMargin: '0px 0px 50px 0px',
  threshold: 0
};
const imgs = document.querySelectorAll('[data-src]');

if (typeof intersectionObserver != 'undefined') {
  // register the config object with an instance
  // of intersectionObserver
  let observer = new intersectionObserver(function (entries, self) {
    // iterate over each entry
    entries.forEach(entry => {
      // process just the images that are intersecting.
      // isIntersecting is a property exposed by the interface
      if (entry.isIntersecting) {
        // custom function that copies the path to the img
        // from data-src to src
        preloadImage(entry.target);
        // the image is now in place, stop watching
        self.unobserve(entry.target);
      }
    });
  }, config);

  imgs.forEach(img => {
    observer.observe(img);
  });
} else {
  imgs.forEach(img => {
    preloadImage(img)
  });
}

function preloadImage(e) {
  var a = e.getAttribute('src'), b = e.getAttribute('data-src');
  if (b.trim() != ''){
    e.src = b.trim();
  }
}




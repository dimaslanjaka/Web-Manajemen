requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "select2": "https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0-rc.2/js/select2.full",
      "app": "../app",
      "loadcss": "loadcss"
    },
    "shim": {
        "jquery.alpha": ["jquery"],
        "jquery.beta": ["jquery"]
    }
});

requirejs(["app/main"]);

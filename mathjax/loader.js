// original
// https://polyfill.io/v3/polyfill.min.js?features=es6
// https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js

// const mathjaxOpt = {/*overriden options*/}

document.addEventListener("DOMContentLoaded", function (event) {
  mathjaxScript("https://polyfill.io/v3/polyfill.min.js?features=es6")
    .then(function () {
      window.MathJax = {
        loader: {
          load: [
            "input/tex-base",
            "[tex]/newcommand",
            "[tex]/action",
            "output/chtml"
          ]
        },
        chtml: {
          scale: 1, // global scaling factor for all expressions
          minScale: 0.5, // smallest scaling factor to use
          matchFontHeight: true, // true to match ex-height of surrounding font
          mtextInheritFont: false, // true to make mtext elements use surrounding font
          merrorInheritFont: true, // true to make merror text use surrounding font
          mathmlSpacing: false, // true for MathML spacing rules, false for TeX rules
          skipAttributes: {}, // RFDa and other attributes NOT to copy to the output
          exFactor: 0.5, // default size of ex in em units
          displayAlign: "left", // default for indentalign when set to 'auto'
          displayIndent: "0" // default for indentshift when set to 'auto'
        },
        tex: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"]
          ],
          packages: ["base", "newcommand", "action"]
        },
        svg: {
          fontCache: "global"
        }
      };

      // assign overriden option
      if (typeof window.mathjaxOpt === "object") {
        window.MathJax = Object.assign(window.MathJax, window.mathjaxOpt);
      }
    })
    .then(function () {
      mathjaxScript("https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js");
    });
});

function mathjaxScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    document.body.appendChild(script);
  });
}

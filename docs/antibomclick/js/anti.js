var AntiFraud = {
  init: function(n) {
      this.run(n), document.cookie = "nct=0;"
  },
  readData: function(n) {
      for (var e = n + "=", t = decodeURIComponent(document.cookie).split(";"), o = 0; o < t.length; o++) {
          for (var c = t[o];
              " " == c.charAt(0);) c = c.substring(1);
          if (0 == c.indexOf(e)) return c.substring(e.length, c.length)
      }
      return ""
  },
  run: function(n) {
      for (var e = n.click, t = n.interval, o = document.getElementsByClassName("AntiFraud"), c = 0, r = o.length; c < r; c++) o[c].addEventListener("click", function() {
          tn = AntiFraud.readData("nct"), po = tn - 1 + 2, AntiFraud.changer(e, t) ? document.cookie = "nct=" + po + ";" : AntiFraud.n("pointer-events:none;")
      })
  },
  changer: function(n, e) {
      return tc = this.readData("nct") - 1 + 2, tc != n || (setTimeout(function() {
          document.cookie = "nct=0;", AntiFraud.n("pointer-events:cursor;")
      }, e), !1)
  },
  n: function(n) {
      for (var e = document.getElementsByClassName("AntiFraud"), t = 0, o = e.length; t < o; t++) e[t].style = n
  }
};
AntiFraud.init({click:3,interval:23000});
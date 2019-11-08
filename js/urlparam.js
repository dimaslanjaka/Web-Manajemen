var url = new URL(location.href);
try {
  var c = url.searchParams.get("c");
  try {
    t = window.atob(c);
    rs = document.getElementById('result_txt');
    if (rs) {
      if (window.btoa(t) == c) {
        rs.innerHTML = t;
      }
    }

  } catch (e) {
    console.log(e);
  }
} catch (u) {
  console.log(u);
}
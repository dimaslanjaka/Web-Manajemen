var url = new URL(location.href);
try {
  var c = url.searchParams.get("c");
  try {
    t = window.atob(c);
    if (document.getElementById('result_txt')){
      document.getElementById('result_txt').innerHTML = t;
    }
  } catch (e) {
    console.log(e);
  }
} catch (u) {
  console.log(u);
}
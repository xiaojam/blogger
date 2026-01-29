! function() {
  function f() {
    var a = document.createElement("div");
    a.id = "adbro";
    a.innerHTML = '<p>PEMBERITAHUAN!<br/><br/><span>Untuk mengakses laman ini, mohon matikan layanan Adblock Anda<br/><br/>Terima Kasih</span><br/> <a href="JavaScript:window.location.reload()">MUAT ULANG</a></p>';
    document.body.append(a);
    document.body.style.overflow = "hidden";
  }
  var b = document.createElement("script");
  b.type = "text/javascript";
  b.async = !0;
  b.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  b.onerror = function() {
    f();
    window.adblock = !0
  };
  var e = document.getElementsByTagName("script")[0];
  e.parentNode.insertBefore(b, e)
}();

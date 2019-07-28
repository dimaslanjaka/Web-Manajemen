document.body.innerHTML += '<div id="google_translate_element"></div>';

dimas.js('//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit', function() {});

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'id',
    includedLanguages: 'ar,en,es,jv,ko,pa,pt,ru,zh-CN,id',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    autoDisplay: false
  }, 'google_translate_element');
}


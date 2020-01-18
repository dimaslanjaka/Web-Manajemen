if (typeof window.jQuery != 'undefined'){
  var dataLabel = $('[data-label]');
  if (dataLabel.length){
    dataLabel.each(function(i, obj){
      var labelName = obj.getAttribute('data-label');
      if (labelName && labelName != ''){
        
      }
    })
  }
}

$(function() {

  $(' #da-thumbs > li > a').each( function() { $(this).hoverdir(); } );

});

$(function(){
  $(".account").hover(function(){
    $(this).next("ul").slideDown()
  },function(){
    $(this).next("ul").slideUp()
  })
})

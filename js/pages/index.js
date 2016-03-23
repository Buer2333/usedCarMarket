
$(function() {

  $(' #da-thumbs > li > a').each( function() { $(this).hoverdir(); } );

});

$(function(){
  $(".account").hover(function(){
    clearTimeout(t)
    $(this).next("ul").slideDown()
  },function(){
    t=setTimeout(function(){
      $(this).next("ul").slideUp()
    },500)
  })
});

$(function(){
  $(".dropdown-info").hover(function(){

  },function(){

  })
});
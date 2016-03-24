
$(function() {

  $(' #da-thumbs > li > a').each( function() { $(this).hoverdir(); } );

});
//用户下拉
var t
$(function(){
  $(".account").hover(function(){
    clearTimeout(t);
    //$(this).next("ul").stop(false,true);
    $(this).next("ul").slideDown()
  },function(){
    t=setTimeout(function(){
      //$(".dropdown-info").stop(false,true);
      $(".dropdown-info").slideUp()
    },500)
  })
});

$(function(){
  $(".dropdown-info").hover(function(){
    clearTimeout(t)
  },function(){
    t=setTimeout(function(){
      $(".dropdown-info").slideUp()
    },500)
  })
});
//城市索引查询
$(".city-in-group").on("click",function(event){
  var cityName = $(this).text();
  location.href = "carList.html?cityName="+cityName;
});


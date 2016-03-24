
$(function() {

  $(' #da-thumbs > li > a').each( function() { $(this).hoverdir(); } );

});

//城市索引查询
$(".city-in-group").on("click",function(event){
  var cityName = $(this).text();
  location.href = "carList.html?cityName="+cityName;
});


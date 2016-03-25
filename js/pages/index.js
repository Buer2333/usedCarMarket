//推荐车辆动效
$(function() {
  $(' #da-thumbs > li > a').each( function() { $(this).hoverdir(); } );
});

//城市索引查询
$(".city-in-group").on("click",function(event){
  var cityName = $(this).text();
  location.href = "carList.html?cityName="+cityName;
});
//index品牌筛选
$(".search-brand").on("click",function(){
  var brand = $(this).text();
  location.href = "carList.html?cityName=厦门&brand="+brand;
})


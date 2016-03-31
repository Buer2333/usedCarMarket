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
//index年份筛选
$(".search-age").on("click",function(){
  var age = $(this).text();
  location.href = "carList.html?cityName=厦门&age="+age;
})
//index价格筛选
$(".search-price").on("click",function(){
  var price = $(this).text();
  location.href = "carList.html?cityName=厦门&price="+price;
})
//搜索框搜索
$(".search").on("click",function(){
  var text = $(this).prev().val();
  //if(isNaN(text)){
  //  location.href = "carList.html?cityName=厦门&brand="+text+"万";
  //}else {
  //  location.href = "carList.html?cityName=厦门&price="+text;
  //}
  location.href = "carList.html?cityName=厦门&text="+text;
})

$(".customize-sublime").on("click",function(){
  brandText = $(".brand-text").val();
  mileText = $(".mile-text").val();
  messageText = $(".message-text").val();
  nameText = $(".name-text").val();
  telText = $(".tel-text").val();
  var Cardic = {
    "brand_name": brandText,
    "mile_text":mileText,
    "message_text":messageText,
    "name_text":nameText,
    "tel_text":telText
  };
  console.log(Cardic);
  addrequestCar(Cardic);
});

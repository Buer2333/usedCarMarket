//正则获取url参数
(function ($) {
  $.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
  }
})(jQuery);
var cityName = $.getUrlParam('cityName');
var brand = $.getUrlParam('brand');
var price = $.getUrlParam('price');
var text = $.getUrlParam('text');
//var series = $.getUrlParam('series');


//进入该页面判断城市
$(document).ready(function(){
  //清空缓存
  sessionStorage.removeItem('compareCar1');
  sessionStorage.removeItem('compareCar2');
  console.log(cityName);
  console.log($(".city-replace"));
  if($(".city-replace").is(":empty")){
    $(".city-replace").text(cityName);
  }
  if (brand != null){
  getDataWithCityName(cityName,getCarListWithBound(brand));
    return
  }
  if (price != null){
  getDataWithCityName(cityName, getCarListWithPrice(price));
    return
  }
  if (text != null){
    getDataWithCityName(cityName, searchCarsWithTag(text));
    return
  }
  //if (text! = null){
  //  getDataWithCityName(cityName,getCarListWithBoundId(text))
  //}
  getCityIdWithName(cityName);


});
//在当前页面切换城市
$(".city-in-group").on("click",function(event){
  cityName = $(this).text();
  //location.href = "carList.html?cityName="+cityName;
  getCityIdWithName(cityName);
  //城市button的value取代
  $(".city-replace").text(cityName);
});
//carList模版
var carListTemplate = $('')
//carList下拉列表
$(document).ready(function(){
  var range = 50;             //距下边界长度/单位px
  var elemt = 500;           //插入元素高度/单位px
  var maxnum = 20;            //设置加载最多次数
  var num = 1;
  var totalheight = 0;
  var main = $(".list-update");                     //主体元素
  $(window).scroll(function(){
    var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)

    //console.log("滚动条到顶部的垂直高度: "+$(document).scrollTop());
    //console.log("页面的文档高度 ："+$(document).height());
    //console.log('浏览器的高度：'+$(window).height());

    totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
    if(($(document).height()-range) <= totalheight  && num != maxnum) {
      getCarsWithAscendPrice(false);
      num++;
    }
  });
});
//carList顺序筛选
//升序
$(".price").on('click',function(){
  getCarsWithAscendPrice(true);
})
$(".mile_age").on('click',function(){
  getCarsWithAscendMile(true);
})


//降序
$(".vpr").on('click',function(){
  getCarsWithDescendVpr(true);
})
//收藏阻止冒泡
//$(document).ready(function(){
//  $(".list-update").on('click','i',function(){
//    $(this).toggleClass('active');
//    event.stopPropagation()
//  });
//});
function onClick(abc){
  $(abc).toggleClass('active');
  //触发收藏
  var carId = $(abc).attr('name');
  console.log(carId);
  collectCarData(carId);
}
//加入对比

function addToCompare(car){
  $(car).toggleClass('active')
  var carId = $(car).attr('name');
  saveCarToSession(carId,car);
}
//筛选样式active&筛选功能
$(".filter-brand").on("click",function(){
  $(this).addClass('active').siblings().removeClass('active');
  var filterBrand = $(this).text();
  getCarListWithBound(filterBrand);
});
function obtainSeries(seriesText){
  var filterSeries = $(seriesText).text();
  getCarListWithBoundId(filterSeries);
}
$(".filter-price").on("click",function(){
  $(this).addClass('active').siblings().removeClass('active');
  var filterPrice = $(this).text();
  getCarListWithPrice(filterPrice);

});


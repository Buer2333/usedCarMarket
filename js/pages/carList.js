
$(".icon-star").on('click',function(event){
  event.stopPropagation();
  $(this).toggleClass('active');
});
//carList模版
var carListTemplate = $('')
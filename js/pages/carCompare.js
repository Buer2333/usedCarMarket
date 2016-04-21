var str1 = sessionStorage.compareCar1;
var str2 = sessionStorage.compareCar2;
//进入页面查看是否有对比车辆

if(str1 == null&& str2 == null){
  $(".compare-content").append('<p class="compare-null">'+'尚未添加对比车辆!'+'</p>')
}else {
  var reg = /[^:]*:([^:]*)/;
  str1 = str1.replace(reg,"$1");
  str2 = str2.replace(reg,"$1");
  var compareCar1 = JSON.parse(str1);
  var compareCar2 = JSON.parse(str2);
}



var compareCar = [compareCar1,compareCar2];
$.each(compareCar,function(index){
  //$('.city').html(compareCar[index].city_name);
  //var date = compareCar[index].register_date.split(' ')[0]
  //var time = date.split('-');
  //document.getElementById("pic_url").src = compareCar[index].pic_url;
  //
  //var date = compareCar[index].register_date.split(' ')[0]
  //var time = date.split('-');
  //$('.mile_age').html(compareCar[index].mile_age + '万公里');
  //$('#register_date').html(time[0] + '年' + time[1] + '月');
  //$('.tel').html(compareCar[index].tel);
  //if (typeof(compareCar[index].color) != 'undefined') {
  //  $('.color').html(compareCar[index].color);
  //} else {
  //  $('.color').html('');
  //}
  //$('.gear_type').html(compareCar[index].gear_type);
  //$('.liter').html(compareCar[index].liter);
  //$('.tlci_date').html(compareCar[index].tlci_date);
  //$('.audit_date').html(compareCar[index].audit_date);
  //$('.model_price').html(compareCar[index].model_price + '万');
  //$('.car_desc').html(compareCar[index].car_desc);
  //$('.eval_price').html(compareCar[index].eval_price + '万');
  //$('.next_year_eval_price').html(compareCar[index].next_year_eval_price + '万');


  var date = compareCar[index].register_date.split(' ')[0]
  var time = date.split('-');
  var carCompareModel = '<section class="" tabindex="-1" role="dialog" id="target">'+
      '<div class="modal-dialog ">'+
      '<div class="modal-content car-content">'+
      '<div class="modal-body modal-public-style">'+
      '<div class="row row-mb">'+
      '<div class="col-md-6">'+
      '<label class="col-md-4 text-right">图片预览</label>'+
      '<div class="col-md-8">'+
      '<img src="'+compareCar[index].pic_url+'" class="modal-img" alt="" class="pic_url">'+
      '</div>'+
      '<div class="row row-mb">'+
      '<label class="col-md-4 text-right">所在城市</label>'+
      '<div class="col-md-8" class="city">' + compareCar[index].city_name + '</div>'+
      '</div>'+
      '<div class="row row-mb">'+
      '<label class="col-md-4 text-right">行驶里程</label>'+
      '<div class="col-md-8" class="mile_age">'+compareCar[index].mile_age + '万公里'+'</div>'+
      '</div>'+
      '<div class="row row-mb">'+
      '<label class="col-md-4 text-right">车辆上牌日期</label>'+
      '<div class="col-md-8" class="register_date">'+time[0] + '年' + time[1] + '月'+'</div>'+
      '</div>'+
      '<div class="row row-mb">'+
      '<label class="col-md-4 text-right">联系电话</label>'+
      '<div class="col-md-8" class="tel">'+compareCar[index].tel+'</div>'+
      '</div>'+
      '</div>'+
      '<div class="col-md-6">'+
      '<div class="row row-mb">'+
      '<label class="col-md-4 text-right">车身颜色</label>'+
      '<div class="col-md-8" class="color">'+compareCar[index].color+'</div>'+
      '</div>'+
      '<div class="row row-mb">'+
      '<label class="col-md-4 text-right">变速箱</label>'+
      '<div class="col-md-8" class="gear_type">'+compareCar[index].gear_type+'</div>'+
      '</div>'+
      '<div class="row row-mb">'+
      '<label class="col-md-4 text-right">排量</label>'+
      '<div class="col-md-8" class="liter">'+compareCar[index].liter+'</div>'+
      '</div>'+
      '<div class="row row-mb">'+
      '<label class="col-md-4 text-right">强交险到期时间</label>'+
      '<div class="col-md-8" class="tlci_date">'+compareCar[index].tlci_date+'</div>'+
      '</div>'+
      '<div class="row row-mb">'+
      '<label class="col-md-4 text-right">商业险到期时间</label>'+
      '<div class="col-md-8" class="audit_date">'+compareCar[index].audit_date+'</div>'+
      '</div>'+
      '<div class="row row-mb">'+
      '<label class="col-md-4 text-right">车型指导价</label>'+
      '<div class="col-md-8" class="model_price">'+compareCar[index].model_price+'</div>'+
      '</div>'+
      '<div class="row row-mb">'+
      '<label class="col-md-4 text-right">车源描述</label>'+
      '<div class="col-md-8" class="car_desc">'+compareCar[index].car_desc+'</div>'+
      '</div>'+
      '<div class="row row-mb">'+
      '<label class="col-md-4 text-right">车源估值</label>'+
      '<div class="col-md-8" class="eval_price">'+compareCar[index].eval_price+'</div>'+
      '</div>'+
      '<div class="row row-mb">'+
      '<label class="col-md-4 text-right">下一年估值</label>'+
      '<div class="col-md-8" class="next_year_eval_price">'+compareCar[index].next_year_eval_price+'</div>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '</section>'
      $(".compare-content").append(carCompareModel)
});






//子标签切换
$(function() {
  $(".tab > li").on('click',tab);

  function tab() {
    var tab = $(this).attr("title");
    $("#" + tab).addClass('show-table').siblings().removeClass('show-table');
  }
});
//表格插件配置
var grid_2_1_4;

var dtGridColumns_2_1_4 = [
  {id:'model_name', title:'汽车名称', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {id:'mile_age', title:'行驶里程数', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {id:'register_date', title:'车辆上牌日期', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {id:'brand_name', title:'品牌', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {id:'series_name', title:'车系', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {id:'price', title:'价格', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {
    id: 'operation',
    title: 'Operation',
    type: 'string',
    columnClass: 'text-center',
    headerStyle:'background:#00a2ca;color:white;',
    resolution: function (value, record, column, grid, dataNo, columnNo) {
      var content = '';
      content += '<button class="btn btn-xs btn-default" onclick="alert(\'Edit User: ' + record.id + '\');"><i class="fa fa-edit"></i>  Edit</button>';
      content += '  ';
      content += '<button class="btn btn-xs btn-danger" onclick=" delectCarWithCarId(' + record.id + ');"><i class="fa fa-trash-o"></i>  Delete</button>';
      return content;
    }
  }
];

//正则获取url参数
(function ($) {
  $.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
  }
})(jQuery);
var cityName = $.getUrlParam('cityName');
console.log(cityName);
//进入该页面判断城市
$(document).ready(function(){
  getDataWithCityName(cityName,function(data){

    var dtGridOption_2_1_4 = {
      lang : 'zh-cn',
      ajaxLoad : false,
      exportFileName : 'User List',
      datas:data,
      columns : dtGridColumns_2_1_4,
      gridContainer : 'dtGridContainer_2_1_4',
      toolbarContainer : 'dtGridToolBarContainer_2_1_4',
      tools : '',
      pageSize : 10,
      pageSizeLimit : [10, 20, 50]
    };

    grid_2_1_4 = $.fn.DtGrid.init(dtGridOption_2_1_4);
    grid_2_1_4.load();
  });
  if($(".city-replace").is(":empty")){
    $(".city-replace").text("城市");
  }
});
//在当前页面切换城市
$(".city-in-group").on("click",function(){
  cityName = $(this).text();
  location.href = "admin.html?cityName="+cityName;
});
//城市button的value取代
$(".city-replace").text(cityName);

$(function(){


});
//城市切换刷新页面
//$(".tooltips").on


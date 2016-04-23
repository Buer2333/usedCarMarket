
//子标签切换
$(function() {
  $(".tab > li").on('click',tab);

  function tab() {
    var tab = $(this).attr("title");
    $("#" + tab).addClass('show-table').siblings().removeClass('show-table');
  }
});
//表格插件配置
//所有城市表格
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
      //console.log(record)

      var content = '';
      var data = record;
      content += '<button class="btn btn-xs btn-default" onclick="showEditModal(' + data.id + ')" data-toggle="modal"><i class="fa fa-edit"></i>  Edit</button>';
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
  getPriceCar(function(data){
    var dtGridOption_2_1_5 = {
      lang : 'zh-cn',
      ajaxLoad : false,
      exportFileName : 'User List',
      datas:data,
      columns : dtGridColumns_2_1_5,
      gridContainer : 'dtGridContainer_2_1_5',
      toolbarContainer : 'dtGridToolBarContainer_2_1_5',
      tools : '',
      pageSize : 10,
      pageSizeLimit : [10, 20, 50]
    };
    grid_2_1_5 = $.fn.DtGrid.init(dtGridOption_2_1_5);
    grid_2_1_5.load();
  });

  getrequestCars(function(data) {
    console.log(data)
    var dtGridOption_2_1_6 = {
      lang: 'zh-cn',
      ajaxLoad: false,
      exportFileName: 'User List',
      datas: data,
      columns: dtGridColumns_2_1_6,
      gridContainer: 'dtGridContainer_2_1_6',
      toolbarContainer: 'dtGridToolBarContainer_2_1_6',
      tools: '',
      pageSize: 10,
      pageSizeLimit: [10, 20, 50]
    };

    grid_2_1_6 = $.fn.DtGrid.init(dtGridOption_2_1_6);
    grid_2_1_6.load();

  });
});
//在当前页面切换城市
$(".city-in-group").on("click",function(){
  cityName = $(this).text();
  location.href = "admin.html?cityName="+cityName;
});
//城市button的value取代
$(".city-replace").text(cityName);

//卖车信息表格
var grid_2_1_5;

var dtGridColumns_2_1_5 = [
  {id:'brand_name', title:'汽车品牌', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {id:'mile_age', title:'行驶里程数', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  //{id:'series_name', title:'车系', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {id:'price', title:'价格', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {id:'tel', title:'电话', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {
    id: 'operation',
    title: 'Operation',
    type: 'string',
    columnClass: 'text-center',
    headerStyle:'background:#00a2ca;color:white;',
    resolution: function (value, record, column, grid, dataNo, columnNo) {
      var content = '';

      content += '  ';
      content += '<button class="btn btn-xs btn-danger" onclick=" deletePlacCar(\''+record.key+'\');"><i class="fa fa-trash-o"></i>  Delete</button>';
      return content;
    }
  }
];



//找车信息表格
var grid_2_1_6;

var dtGridColumns_2_1_6 = [
  {id:'brand_name', title:'品牌车系', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {id:'mile_text', title:'行驶里程数', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {id:'name_text', title:'客户称呼', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {id:'tel_text', title:'客户联系电话', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {id:'message_text', title:'备注信息', type:'string', columnClass:'text-center', headerStyle:'background:#00a2ca;color:white;'},
  {
    id: 'operation',
    title: 'Operation',
    type: 'string',
    columnClass: 'text-center',
    headerStyle:'background:#00a2ca;color:white;',
    resolution: function (value, record, column, grid, dataNo, columnNo) {
      var content = '';

      content += '  ';
      content += '<button class="btn btn-xs btn-danger" onclick=" deleteRequestCar(\'' + record.key + '\');"><i class="fa fa-trash-o"></i>  Delete</button>';
      return content;
    }
  }
];





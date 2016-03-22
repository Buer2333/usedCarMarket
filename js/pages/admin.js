//获取底部宽度
$(document).ready(function(){
  var sidebarWidth = $(document).width()- $('#sidebar').width()-1;
  $('.site-footer').css('width',sidebarWidth + 1)
  $('.site-footer').css('left',$('#sidebar').width()-1)
});
//子标签切换
$(function() {
  $(".tab > li").on('click',tab);

  function tab() {
    var tab = $(this).attr("title");
    $("#" + tab).addClass('show-table').siblings().removeClass('show-table');
  };
});
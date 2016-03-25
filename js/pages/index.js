//推荐车辆动效
$(function() {
  $(' #da-thumbs > li > a').each( function() { $(this).hoverdir(); } );
});
//登陆成功以后显示并储存用户信息
$(document).ready(function(){
  console.log(sessionStorage.userName)
  if(sessionStorage.userName == ''){
    $(".toggle-display").show()
  }else {
    $(".dropdown-container").show();
    $(".account-name").text(sessionStorage.userName);
  }
})
//下拉退出登陆
$(".logout").on('click',function(){
  var user = new User(sessionStorage.userName);
  user.exitLogin();
  //uid = authData.uid.split(':')[1];
  //localStorage.token = authData.token;
  sessionStorage.userName = '';
  location.href = "index.html";
})
//城市索引查询
$(".city-in-group").on("click",function(event){
  var cityName = $(this).text();
  location.href = "carList.html?cityName="+cityName;
});


//背景图片随机切换
var bgNum = randomNum(1, 3);
var bgImg = 'img/bg-' + bgNum + '.jpg';
$('body').width($(window).width())
    .height($(window).height())
    .css({"backgroundImage": 'url(' + bgImg + ')'});
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
      break;
    default:
      return 0;
      break;
  }
}
//登陆注册
var ref = new Wilddog("https://mxlucm.wilddogio.com");

$(function(){

  $("#login").on("click",function(){
    var $userName = $("#username").val();
    var $passWord = $("#password").val();
    alert($userName+$passWord);
    var user = new User($userName,$passWord);
    user.Login();
  })
})

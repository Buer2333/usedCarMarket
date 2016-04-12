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

$("#register").on('click',function(){
  //console.log(registerEmail + registerPassword)
  var registerEmail = $("#email").val();
  var registerPassword = $("#password").val();
  var registerUsername = $("#username").val();
  var registerTel = $("#tel").val();
  user = new User(registerEmail,registerPassword);

  user.registerUser(registerUsername,registerTel);
})



$("#register").on('click',function(){
  //console.log(registerEmail + registerPassword)
  var registerEmail = $("#email").val();
  var registerPassword = $("#password").val();
  var registerUsername = $("#username").val();
  var registerTel = $("#tel").val();
  user = new User(registerEmail,registerPassword);
  user.userName = registerUsername;
  user.tel = registerTel;
  user.registerUser();

})

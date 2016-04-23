var ref = new Wilddog("https://ttrcar.wilddogio.com/"); //野狗数据根地址
var carList = new Array();
var getCarBrandList = "http://api.che300.com/service/getCarBrandList?token=60998c88e30c16609dbcbe48f3216df3"
var cityId = 44;
var lastCarVar = 0;
var brand = '';
var carLisKeys = new Array();
var uid = sessionStorage.id;
var index = 0;
//var collectCars = sessionStorage.collectCars

// 注册回调方法，在每次终端用户认证状态发生改变时，回调方法被执行。
//
//function authDataCallback(authData) {
//    if (authData) {
//        console.log("User " + authData.uid + " is logged in with " + authData.provider);
//    } else {
//        console.log("User is logged out");
//    }
//}

// ref.onAuth(authDataCallback);

function User(email, password) {
    this.email = email;
    this.password = password;

    this.Login = function() { // 登陆
        console.log(this.email);
        ref.authWithPassword({
            email: this.email,
            password: this.password
        }, authHandler);
    }

    function authHandler(error, authData) {
        if (error) {
            alert("密码/用户名错误!")
            console.log("Login Failed!", error);
        } else {
            /**
             *填写登陆成功后的代码
             */
            uid = authData.uid.split(':')[1];sessionStorage.id = uid;
            localStorage.token = authData.token;
            sessionStorage.userName = email;
            location.replace(document.referrer);
            console.log("Authenticated successfully with payload:", authData);
            getUserCarsWithColloct();
        }
    }
    //通过浏览器储存的token进行登陆
    this.authWithCustomToken = function() {
        //通过session 保存的token 登陆
        ref.authWithCustomToken(localStorage.token, authHandler);
    };

    // 退出登陆
    this.exitLogin = function() {
        ref.unauth();
        sessionStorage.clear();
        alert("退出成功!");
    };
    //注册
    this.registerUser = function(userName, tel) {
            ref.createUser({ email: this.email, password: this.password },
                function(err, data) {
                    if (err != null) {
                        alert("注册失败!");
                            //not success
                    } else {
                        //alert(data.uid);
                        var uid = data.uid.split(':')[1];
                        console.log("user" + userName + 'pass' + tel)
                        var dic = {
                            'userName': userName,
                            'tel': tel
                        }
                        console.log(dic);
                        ref.child('Users/' + uid).set(dic);
                        alert("注册成功!");
                        location.href = "index.html";
                    }
                }
            )
        }
        /**
         * 添加用户信息
         */
   // function addUserData(data) {
    //    console.log(data)

   // }
   // this.resetPassword = function (){
   //     ref.resetPassword({'email':this.email},function(err){
     //       if (err==null) {
        //        console.log("成功")
     //           // statement
     //       }else{
       //         console.log('失')
       //     }
     //   })
   // }
}

/**
 * 收藏汽车信息
 * @param  {[number]} id [汽车的ID]
 * @return {[空]}    [description]
 */
function collectCarData(id) {
    //var collectCars = sessionStorage.collectCars ;
    ref.child('Users/' + uid).child('collectCars').orderByChild('id').equalTo(id).once('value', function(data) {

        if (data.val() == null) {
            ref.child('Users/' + uid).child('collectCars/' + id).set({ 'id': id, 'cityId': cityId });
            data = carList[id];
            sessionStorage[id] = data;
        } else {
            ref.child('Users/' + uid).child('collectCars/' + id).remove();
        }
    })
}

//
//添加一辆需求的汽车数据
//传入一辆车的字典数据
function addrequestCar(dic){
    ref.child('requestCars').push().set(dic)
    alert("提交成功!")
    location.reload()
}
// 得到所有需求的汽车数据
function getrequestCars(fnc){
    ref.child('requestCars').on('value',function(data){
        /// data.val() 为申请查询的汽车的数据
        var cars = [];
        data.forEach(function(data){
            var carData = data.val();
            carData.key = data.key();
            console.log(carData);
            cars.push(carData)
        })
        fnc(cars);
    })
}

// 添加要卖的车的数据
function addPlacCar(dic){
    ref.child('placCars').push().set(dic)
    alert("提交成功!")
    location.reload()
}
//查询卖车数据
function getPriceCar(fnc){
    ref.child('placCars').on('value',function(data){
        /// data.val() 为申请查询的汽车的数据
        var cars = [];
        data.forEach(function(data){
            //data.val().key = data.key();
            var carData = data.val();
            carData.key = data.key();

            //carWithSellList[data.key()] = data.val();
            cars.push(carData);
        });
        //cars.push(datas.val())
        fnc(cars)
    })
}

//删除卖车信息
function deletePlacCar (key){
    ref.child('placCars/'+key).set(null);
    location.reload()

}
//删除需求信息
function deleteRequestCar (key){
    ref.child('requestCars/'+key).set(null);
    location.reload()

}

//添加比较车辆到Session
function saveCarToSession(id,car) {//id当前点击对比的汽车id,

    var compareCar1;//对比汽车的第第一辆汽车的id;
    var compareCar2;//对比汽车的第第二辆汽车的id

    try{//try异常处理机制,当try内容执行失败的时候将会执行catch里的内容
         compareCar2 =  sessionStorage.compareCar2.split(':')[0];//将session存储的字符串通过':分割成2个数组,第一个是汽车id,第二个是汽车对象字符串数据

    }catch (err){
        compareCar2 = ''//如果try异常 默认设为空字符串
    }
    try{
        compareCar1=sessionStorage.compareCar1.split(':')[0];

    }catch (err){
        compareCar1=''
    }
    if (compareCar2==(id+'')){//判断session储存的汽车对比汽车的id是不是和当前点击对比按钮的汽车id一致
        //如果一致 将删除session中对应的汽车数据,取消对比
        sessionStorage.removeItem('compareCar2');
        return;
    }
    if (compareCar1==(id+'')){
        sessionStorage.removeItem('compareCar1');
        return;
    }
    data = carList[id]//通过id重carList中获取当前汽车的对象数据
    var str = id+':'+JSON.stringify(data)//讲data对象序列化城json字符串拼接成   汽车的ID:对象数据字符串格式 如
    //114399233:{"audit_date":"2016-06-01","brand_id":"25","brand_name":"大众","car_desc":"这辆车是我14年购买的，平时主要用来出行代步和家用，到现在跑了2万多公里。平时用车很爱惜，我会经常打理，外观和内饰都保持的很好。我这车高尔夫动力强劲，底盘扎实平稳，操控灵活，乘坐舒适，适合上下班代步和居家使用，喜欢这辆车的朋友请跟我联系！","car_service":"62-63+64-","car_source":"renrenche","car_status":"1","city":"44","city_name":"厦门","color":"红色","contactor":"陈先生","dealer_id":"0","eval_price":"12.0358","gear_type":"双离合变速箱(DCT)","grab_time":"2016-03-01 13:33:47","id":"114399233","inspected":"1","is_trusted":"1","level":"3","liter":"1.4T","match_rate":"5","match_step":"0","mile_age":2.03,"model_id":"20643","model_name":"2014款 高尔夫 1.4TSI 自动豪华型","model_price":"16.59","next_year_eval_price":"11.098792716978222","pic_url":"https://img2.rrcimg.com/o_1acoaaj243896423089388011390315123.jpg?imageView2/1/w/290/h/185","post_time":"2016-03-01 00:00:00","price":14.3,"prov":"14","qa_flag":"1","qa_price":"0","reg_year":"2014","register_date":"2014-06-01 00:00:00","residual_value":"0.9221449792193213","seller_type":"1","series_id":"331","series_name":"高尔夫","tel":"4000520651","title":"大众-高尔夫 2014款 1.4TSI 自动豪华型","tlci_date":"2016-06-01","update_time":"2016-03-01 00:00:10","url":"http://www.che300.com/car/show/114399233.htm","url_hash":"11528F32C6953F57823AECBC1554C387","vpr":0.8416674,"weight":"200"}
    //如果session 中有一个对比没有数据或者都没有数据是执行下面方法
    if (sessionStorage.compareCar1 == undefined &&(id+'')!=compareCar2){//如果第一个对比汽车的数据不等于空或者不等于第二辆的对比汽车数据执行下面
        //将str数据存储到seesion中的第一辆对比数据
        sessionStorage.compareCar1 = str;
        alert("添加成功!");
    }else if (sessionStorage.compareCar2 == undefined&&(id+'')!=compareCar1){
        sessionStorage.compareCar2 = str;
        alert("添加成功!");

    }else {
        //如果添加重复的汽车数据或者对比汽车1,2中都有了数据执行下面方法。
        alert('不能添加')
        $(car).removeClass('active');
    }





    console.log(id)
}
/**
 * 传递一辆新车的数据必须包含汽车所属的城市
 * 城市id取名cityId
 * 
 * 
 */
//添加新车到汽车数据库中
function addNewCar(data){
    ref.child('car_list/'+data.cityId).push().set(data)
}

function getUserCarsWithColloct() {
    var collectCars = sessionStorage.collectCars;
    ref.child('Users/' + uid).child('collectCars').on('value', function(datas) {
        datas.forEach(function(data) {
            var id = data.val().id;

            ref.child('car_list/' + data.val().cityId).orderByChild('id').equalTo(id).on('child_added', function(data) {
                //添加data的数据
                sessionStorage[data.val().id] = data.val();
                addCar(data.val(), '')
            });

        })
    });
}
//通过价格查询
function getCarListWithPrice(price) {
    clearCars(true);
    var range = price.split('-');
    ref.child('car_list/' + cityId).orderByChild('price').startAt(parseFloat(range[0])).endAt(parseFloat(range[1])).on('value', function(datas) {
        datas.forEach(function(data) {
            addCar(data.val(), name);
        });
    })
}

//通过品牌查询
function getCarListWithBound(name) {
    clearCars(true);
    console.log("通过品牌查询" + cityId);
    ref.child('car_list/' + cityId).orderByChild('brand_name').equalTo(name).on("child_added", function(snapshot) {
        //snapshot.forEach(function(data) {
        addCar(snapshot.val(), "brand_name");

        //})
    })
    console.log("品牌" + name);
    ref.child('carbrand/brand_list').orderByChild('brand_name').equalTo(name).on('child_added', function(snapshot) {

        ref.child('series_list/').orderByKey().equalTo(snapshot.val().brand_id).on('child_added', function(data) {
                //车系
            $('#series').html('');
            var model ='<label>车 系:</label><a class="hvr-radial-out filter-series active" href="#">不限</a>'
            $('#series').append(model);
            for(var number = 0 ;number<6 ; number++){

                var li ='<a class="hvr-radial-out filter-series " href="#" onclick="obtainSeries(this)">'+data.val()[number].series_name+'</a>';
                $('#series').append(li);

            }
            $(".filter-series").on("click",function(){
                $(this).addClass('active').siblings().removeClass('active');
            });
        })
    })
}
//通过车系排序
function getCarListWithBoundId(id) {
    clearCars(true);
    ref.child('car_list/' + cityId).orderByChild('series_name').equalTo(id).on('value', function(datas) {
        datas.forEach(function(data) {
            addCar(data.val(), id);
        });
    })

}
//价格升序排列车
function getCarsWithAscendPrice(isClear) {
    clearCars(isClear);
    ref.child("car_list/" + cityId).orderByChild("price").startAt(parseFloat(lastCarVar)).limitToFirst(10).once("value", function(snapshot) {
        snapshot.forEach(function(data) {
            addCar(data.val(), "price");
            //console.log(data.val().price);
        })
    });
}
//里程升序排列车
function getCarsWithAscendMile(isCleser) {
    clearCars(isCleser);

    ref.child("car_list/" + cityId).orderByChild("mile_age").startAt(parseFloat(lastCarVar)).limitToFirst(10).once("value", function(snapshot) {
        snapshot.forEach(function(data) {
            addCar(data.val(), "mile_age");
        })
    });
}
//性价比降序排列车
function getCarsWithDescendVpr(isCleser) {
    clearCars(isCleser);
    if (isCleser) {
        lastCarVar = 100;
    }
    ref.child("car_list/" + cityId).orderByChild("vpr").endAt(parseFloat(lastCarVar)).limitToLast(10).once("value", function(snapshot) {
        snapshot.forEach(function(data) {
            addCar(data.val(), "vpr");
        })
    });
}
//通过城市名列出车表  默认排序
function getCityIdWithName(name, data) {
    ref.child("AllCity/city_list").orderByChild("city_name").equalTo(name).on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            cityId = data.val().city_id;
            getdifaultCas(true);
            //getUserCarsWithColloct();
        });

    });
}

function getdifaultCas(isCleser) {
    clearCars(isCleser);
    if (isCleser) {
        lastCarVar = 0;
    }
    ref.child("car_list/" + cityId).limitToFirst(lastCarVar + 10).on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            addCar(data.val(), "price");
            lastCarVar++;
        })
    });
}
// 通过城市名字获取汽车数据
function getDataWithCityName(name, callBack) {



    ref.child("AllCity/city_list").orderByChild("city_name").equalTo(name).on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            cityId = data.val().city_id;

            ref.child("car_list/" + cityId).orderByKey().limitToFirst(200).on("value", function(snapshot) {
                console.log(snapshot.val())
                snapshot.forEach(function(data) {
                    carLisKeys[data.val().id] = data.key();
                    carList.push(data.val());
                });

                callBack(carList);
            });

        });

    });
}

function delectCarWithCarId(carId) {
    ref.child('car_list/' + cityId + '/' + carLisKeys[carId]).remove();
    alert("删除成功!");
    grid_2_1_4.load();

}
//是否清空汽车数据
function clearCars(isClear) {
    if (isClear) {
        carList = new Array();
        lastCarVar = 0;
        $(".list-row").html('');
    }
}

function addCar(data, type) {
    if (typeof(carList[data.id]) != 'undefined') {
        return;
    }

    var carCell = newCarCell(data);
    $(".abc").append(carCell);
    $(".favorite-list").append(carCell)
    carList[data.id] = data;
    lastCarVar = data[type];

}
//汽车信息模板
function newCarCell(data) {
    var starClass = 'icon-star'
    if (sessionStorage[data.id] != null)
        starClass = 'icon-star active';
    var date = data.register_date.split(' ')[0];
    var time = date.split('-');
    var carModel = '<li class="modal-directive col-md-3" onclick="showModal(' + data.id + ')">' +
        '<div class="modal-container " data-toggle="modal" >' +
        '<div>' +
        '<img src="' + data.pic_url + '">' +
        '</div>' +
        '<article class="list-info">' +
        '<p class="list-title">' +
        data.model_name +
        '</p>' +
        '<p class="list-desc">' +
        +time[0] + '年' + time[1] + '月/' + data.mile_age + '万公里' + '/' + data.city_name +
        '</p>' +
        '<p class="list-price">' +
        '<span>' +
        '<em>' + data.price + '</em>万' +
        '</span>' +
        '<a class="btn btn-default text-right btn-sm compare" onclick="addToCompare(this); event.stopPropagation()" name=' + data.id + '>'+'加入对比'+'</a>'+
        '</p>' +
        '<p class="list-bottom">' +
        '<i class="icon-car">' + '</i>' +
        '<span>估值' +

        '<em>' + data.eval_price + '</em>万' +

        '</span>' +
        '<i class="' + starClass + '" onclick="onClick(this); event.stopPropagation()" name=' + data.id + '>' + '</i>' +
        '</p>' +
        '</article>' +
        '</div>'
    return carModel;
}
//显示汽车详细页面
function showModal(index) {
    // var dom = event;

    $('#city').html(carList[index].city_name);
    var date = carList[index].register_date.split(' ')[0]
    var time = date.split('-');
    document.getElementById("pic_url").src = carList[index].pic_url;

    var date = carList[index].register_date.split(' ')[0]
    var time = date.split('-');
    $('#mile_age').html(carList[index].mile_age + '万公里');
    $('#register_date').html(time[0] + '年' + time[1] + '月');
    $('#tel').html(carList[index].tel);
    if (typeof(carList[index].color) != 'undefined') {
        $('#color').html(carList[index].color);
    } else {
        $('#color').html('');
    }
    $('#gear_type').html(carList[index].gear_type);
    $('#liter').html(carList[index].liter);
    $('#tlci_date').html(carList[index].tlci_date);
    $('#audit_date').html(carList[index].audit_date);
    $('#model_price').html(carList[index].model_price + '万');
    $('#car_desc').html(carList[index].car_desc);
    $('#eval_price').html(carList[index].eval_price + '万');
    $('#next_year_eval_price').html(carList[index].next_year_eval_price + '万');
    $('#target').modal('show');
}

//显示编辑汽车信息modal
function showEditModal(index){
    data = carList[carLisKeys[index]]
    $("#input_text1").attr('value',data.model_name);
    $("#input_text2").attr('value',data.mile_age);
    $("#input_text3").attr('value',data.register_date);
    $("#input_text4").attr('value',data.brand_name);
    $("#input_text5").attr('value',data.series_name);
    $("#input_text6").attr('value',data.price);
    $('#edit-modal').modal('show');
    index = carLisKeys[index];
}



//bootstrap动态添加modal

//用户下拉
var t;
$(document).ready(function() {
    $(".account").hover(function() {
        clearTimeout(t);
        //$(this).next("ul").stop(false,true);
        $(this).next("ul").slideDown()
    }, function() {
        t = setTimeout(function() {
            //$(".dropdown-info").stop(false,true);
            $(".dropdown-info").slideUp()
        }, 500)
    })

    $(".dropdown-info").hover(function() {
        clearTimeout(t)
    }, function() {
        t = setTimeout(function() {
            $(".dropdown-info").slideUp()
        }, 500)
    })
});
//登陆成功以后显示储存的用户信息
$(document).ready(function() {
    console.log(sessionStorage.userName);
    if (sessionStorage.userName == undefined) {
        $(".toggle-display").show()
    } else {
        $(".dropdown-container").show();
        $(".account-name").text(sessionStorage.userName);
    }
});
//下拉退出登陆
$(".logout").on('click', function() {
    var user = new User(sessionStorage.userName);
    user.exitLogin();
    window.location.reload()
});
// 通过关键字搜书汽车

function searchCarsWithTag(tag) {
    var numberDouble = /^[0-9]+(.[0-9])?$/;
    var carBrand = /[\u4e00-\u9fa5]{0,}/;
    var isBrand = tag.match(carBrand);
    var isPrice = tag.match(numberDouble);
    if (tag.search(numberDouble) != -1) {
        getRangeCarsWithPice(tag);
        return;
    } else if (tag.search(carBrand) != -1) {
        ref.child('car_list/' + cityId).orderByChild('brand_name').equalTo(tag).on("value", function(snapshot) {
            snapshot.forEach(function(data) {
                addCar(data.val(), "brand_name");

            })
        })
    }
}

//


// 通过价格获取汽车数据

function getRangeCarsWithPice(pice) {
    console.log('afsdf')

    ref.child('car_list/' + cityId).orderByChild('price').startAt(parseFloat(pice) - 5).endAt(parseFloat(pice) + 5).on('value', function(datas) {
        datas.forEach(function(data) {
            console.log(data.val())
            addCar(data.val(), name);
        });
    })
}





function save(){
    console.log('car_list/' + cityId + '/' + index);
    console.log($("#input_text1")[0].value)
    ref.child('car_list/' + cityId + '/' + index).update({
        "model_name":$("#input_text1")[0].value,
        "mile_age":$("#input_text2")[0].value,
        "register_date":$("#input_text3")[0].value,
        "brand_name":$("#input_text4")[0].value,
        "series_name":$("#input_text5")[0].value,
        "price":$("#input_text6")[0].value
    });
    location.reload()
}
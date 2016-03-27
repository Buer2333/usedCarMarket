var ref = new Wilddog("https://ttrcar.wilddogio.com/"); //野狗数据根地址
var carList = new Array();
var getCarBrandList = "http://api.che300.com/service/getCarBrandList?token=60998c88e30c16609dbcbe48f3216df3"
var cityId = 44;
var lastCarVar = 0;
var brand = ''
var carLisKeys = new Array();
var ascend = {
    price: '价格',
}
var uid = sessionStorage.id;
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
    // this.userName = '默认用户名';
    // this.tel = '123456'

    this.Login = function() { // 登陆
        console.log(this.email);
        ref.authWithPassword({
            email: this.email,
            password: this.password
        }, authHandler);
    }

    function authHandler(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            /**
             *填写登陆成功后的代码
             */
            uid = authData.uid.split(':')[1];
            console.log(uid)
            sessionStorage.id = uid;
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
    };
    //注册
    this.registerUser = function(userName, tel) {
            ref.createUser({ email: this.email, password: this.password },
                function(err, data) {
                    if (err != null) {
                        alert("2")
                            //not success
                    } else {
                        var uid = data.uid.split(':')[1];
                        console.log("user" + userName + 'pass' + tel)
                        var dic = {
                            'userName': userName,
                            'tel': tel
                        }
                        console.log(dic);
                        ref.child('Users/' + uid).set(dic);
                    }
                })
        }
        /**
         * 添加用户信息
         */
    function addUserData(data) {
        console.log(data)

    }
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

/**
 * 获取用户收藏汽车的数据
 * @return {[type]} [description]
 */

//function  getUserData(){
//
//    ref.child('Users/'+uid).child('collectCars').on('child_added',function(data){
//        var id = data.val().id;
//        var cityid = data.val().cityId;
//x        if (sessionStorage[id] == 'undefined' ||sessionStorage[id] == null ) {
//            ref.child('car_list/'+cityid).orderByChild('id').equalTo(id).once('value',function(data){
//                data.forEach(function(data){
//                    console.log("uid = "+ uid+ "data= " +carData)
//
//                    carData = data.val();
//                    addCar(carData,'price')
//                })
//
//
//            })
//        }else {
//            carData = sessionStorage[id];
//            addCar(carData,'price')
//
//        }
//        //var data = {
//        //    'name' : sessionStorage.collectCars
//        //};
//    });
//}

function getUserCarsWithColloct() {
    collectCars = sessionStorage.collectCars;
    ref.child('Users/' + uid).child('collectCars').on('value', function(datas) {
        datas.forEach(function(data) {
            var id = data.val().id;

            ref.child('car_list/' + data.val().cityId).orderByChild('id').equalTo(id).on('child_added', function(data) {
                //添加data的数据
                addCar(data.val(), '')
                console.log(data.val().title)
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
        ref.child('series_list/').orderByKey().equalTo(snapshot.val().brand_id).on('value', function(datas) {


        })
    })
}
//通过车系排序
function getCarListWithBoundId(id) {
    clearCars(true);
    ref.child('car_list/' + cityId).orderByChild('brand_id').equalTo(id).on('value', function(datas) {
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
            getUserCarsWithColloct();
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
                snapshot.forEach(function(data) {
                    carLisKeys[data.val().id] = data.key();
                    carList.push(data.val());
                });

                //callBack(carList);
            });

        });

    });
}

function delectCarWithCarId(carId) {
    console.log("carLisKeys=" + carLisKeys[carId] + "cityId = " + cityId);
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

    ref.child('car_list/' + cityId).orderByChild('price').startAt(parseFloat(pice) - 5).endAt(parseFloat(pice) + 5).on('value', function(datas) {
        datas.forEach(function(data) {
            console.log(data.val())
            addCar(data.val(), name);
        });
    })
}

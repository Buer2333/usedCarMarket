var ref = new Wilddog("https://ttrcar.wilddogio.com/"); //野狗数据根地址
var carList = new Array();
var getCarBrandList = "http://api.che300.com/service/getCarBrandList?token=60998c88e30c16609dbcbe48f3216df3"
 var cityId =44 ;
var lastCarVar = 0;
var brand = ''
var ascend = {
    price: '价格',
}
var uid = 

// 注册回调方法，在每次终端用户认证状态发生改变时，回调方法被执行。

function authDataCallback(authData) {
    if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
        console.log("User is logged out");
    }
}

// ref.onAuth(authDataCallback);

function User(email, password) {
    this.email = email;
    this.password = password;



    this.Login = function() { // 登陆
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
            localStorage.token = authData.token;
            location.href = "../../index.html"
            console.log("Authenticated successfully with payload:", authData);
        }
    }
    //通过浏览器储存的token进行登陆
    this.authWithCustomToken = function() {
        //通过seesion 保存的token 登陆
        ref.authWithCustomToken(localStorage.token, authHandler);
    }
    
    // 退出登陆
    this.exitLogin = function() {
            ref.unauth();
        }
        //注册
    this.registerUser = function(email, password) {
        ref.createUser({ email: this.email, password: this.password },
            function(err, data) {
                if (err != null) {
                    //not success
                } else {
                    /**填写注册成功后的代码
                     * 
                     */
                    addUserData(data);
                    console.log(data);
                }
            });
    }
    /**
     * 添加用户信息
     */
    function addUserData(data){
    	var uid = data.uid.split(':')[1];
   		var dic = {
   			'userName' : '没有名字'
   		}
    	ref.child('Users/'+uid).set(dic);
    }
}


/**
 * 收藏汽车信息
 * @param  {[number]} id [汽车的ID]
 * @return {[空]}    [description]
 */
function colloctCarData(id){
	var collctCars = sessionStorage.collctCars ;
	if (typeof(collctCars[id]) == 'undefined' ||typeof(collctCars[id]) == null ) {
		return;
	}
	ref.child('Users/'+uid).child('collctCars').push({'id' : id,'cityId':cityId})
	data = carList[id];
	collctCars[id] = data;
	sessionStorage.collctCars = collctCars


}
/**
 * 获取用户收藏汽车的数据
 * @return {[type]} [description]
 */
function getUserCarsWithColloct(){
	collctCars = sessionStorage.collctCars;
	ref.child('Users/'+uid).on('value',function(datas){
		data.forEach(function(data){
			var id = data.val().id;

			if (typeof(collctCars[id]) != 'undefined' ||typeof(collctCars[id]) != null ) {
				//添加缓存collctCars[id]的数据
			}else {
				ref.child('car_list/'+data.val().cityId).orderByChild('id').equeTo(data.val().id).on('value',function(data){
					//添加data的数据
				});
			}
		})
	});
}

function getCarListWithPrice(price) {
    clear(true);
    var range = price.split('-');
    ref.child('car_list/' + cityId).orderByChild('price').startAt(parseFloat(range[0])).endAt(parseFloat(range[1])).on('value', function(datas) {
        datas.forEach(function(data) {
            console.log(data.val())
            addCar(data.val(), name);
        });
    })
}

//通过品牌查询
function getCarListWithBound(name) {
    clearCars(true);
    ref.child('car_list/' + cityId).orderByChild('brand_name').equalTo(name).on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            addCar(data.val(), "brand_name");

        })
    })
    getCarListWithFirstVar('brand_name', name);

    ref.child('carbrand/brand_list/').orderByChild('brand_name').equalto(name).limitToFirst().onece('value', function(data) {
        ref.child('series_list/').orderByKey().equalTo(data.val().brand_id).once('value', function(datas) {
            datas.forEach(function(data) {
                console.log(data.val());
            });
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
            console.log(data.val().price);
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
function getCityIdWithName(name) {

    ref.child("AllCity/city_list").orderByChild("city_name").equalTo(name).on("value", function(snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function(data){
            cityId = data.val().city_id;
            console.log(cityId);
            getdifaultCas(true);
        });

    });
}
function getdifaultCas(isCleser){
    clearCars(isCleser);
    if (isCleser) {
        lastCarVar = 0;
    }
    ref.child("car_list/" + cityId).limitToFirst(lastCarVar+10).on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            addCar(data.val(), "price");
            lastCarVar ++;
        })
    });
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
    $(".list-row").append(carCell);
    carList[data.id] = data;
    lastCarVar = data[type];

}
//汽车信息模板
function newCarCell(data) {
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
        '<i class="icon-star" name='+data.id+'>' + '</i>' +
        '</p>' +
        '</article>' +
        '</div>'

    return carModel;
}
//显示汽车详细页面
function showModal(index) {
    // var dom = event;

    console.log(carList)
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

var ref = new Wilddog("https://ttrcar.wilddogio.com/"); //野狗数据根地址
var carList = new Array();
var getCarBrandList = "http://api.che300.com/service/getCarBrandList?token=60998c88e30c16609dbcbe48f3216df3"
var cityId = 44;
var lastCarVar =0;
var brand = ''
var ascend = {
        price: '价格',
    }

//通过价格查询

function getCarListWithPrice(price){
    var range = price.split('-');
    ref.child('car_list/'+cityId).orderByChild('price').startAt(parseFloat(range[0])).endAt(parseFloat(range[1])).on('value',function(datas){
        datas.forEach( function(data) {
            console.log(data.val())
            addCar(data.val(),name);
        });
    })
}

//通过车牌查询
function getCarListWithBound(name){
    clearCars(true);
    ref.child('car_list/'+cityId).orderByChild('brand_name').equalTo(name).on("value",function(snapshot){
       snapshot.forEach(function(data){
        addCar(data.val(),"brand_name");

        })
    })
    getCarListWithFirstVar('brand_name',name);
    
    ref.child('carbrand/brand_list/').orderByChild('brand_name').equalto(name).limitToFirst().onece('value',function(data){
        ref.child('series_list/').orderByKey().equalTo(data.val().brand_id).once('value',function(datas){
            datas.forEach( function(data) {

                console.log(data.val());
            });
        })
    })
}
//通过车系排序
function getCarListWithBoundId(id){
    clearCars(true);
    ref.child('car_list/'+cityId).orderByChild('brand_id').equalTo(id).on('value',function(datas){
        datas.forEach( function(data) {
            addCar(data.val(),id);
        });
    })

}
    //价格升序排列车
function getCarsWithAscendPrice(isClear) {
    clearCars(isClear);
    ref.child("car_list/"+cityId).orderByChild("price").startAt(parseFloat(lastCarVar)).limitToFirst(20).once("value", function(snapshot) {
    snapshot.forEach(function(data){
        addCar(data.val(),"price");
        console.log(data.val().price);
    })
    });
}
//里程升序排列车
function getCarsWithAscendMile(isCleser) {
    clearCars(isCleser);

    ref.child("car_list/"+cityId).orderByChild("mile_age").startAt(parseFloat(lastCarVar)).limitToFirst(20).once("child_added", function(snapshot) {
        addCar(snapshot.val());
    });
}
//性价比降序排列车
function getCarsWithDescendVpr(isCleser) {
    clearCars(isCleser);
    if(isCleser){
        lastCarVar =100;
    }
    ref.child("car_list/"+cityId).orderByChild("vpr").endAt(parseFloat(lastCarVar)).limitToLast(20).once("child_added", function(snapshot) {
        addCar(snapshot.val());
    });
}


function getCityIdWithName(name) {

    ref.child("city_content/city_list").orderByChild("city_name").equalTo(name).on("value", function(snapshot) {
        // var city_id = snapshot.val()["city_id"];
        console.log('连接城市完成')
        clearCars(true);


        snapshot.forEach(function(data) {
            // console.log(data.val().city_id)
            cityId = data.val().city_id;
            ref.child("car_list/" + data.val().city_id).limitToFirst(20).on("child_added", function(snapshot) {
                addCar(snapshot.val());
            });
        });
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

function addCar(data,type) {
    if (typeof(carList[data.id]) !='undefined') {
        return;
    }
    var carCell = newCarCell(data);
    $(".list-row").append(carCell);
    carList[data.id] = data;
    lastCarVar =data[type];

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
        '<i class="icon-star">' + '</i>' +
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
    // for (variable in carList[index]) {
    //   var temp = carList[index][variable];
    //     if (typeof(temp)!="undefined"&& typeof(temp)!=0){

    //       $('#'+variable).html(carList[index][variable]);

    //     }else {
    //       $('#'+variable).html('');
    //     }
    // }
    $('#target').modal('show');
}



//bootstrap动态添加modal
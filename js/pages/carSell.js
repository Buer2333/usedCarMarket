
$(".submit>button").on("click",function(){
  brandText = $(".brand-text").val();
  priceText = $(".price-text").val();
  mileText = $(".mile-text").val();
  telText = $(".tel-text").val();
  var Cardic = {
    "brand_name": brandText,
    "price":priceText,
    "mile_age":mileText,
    "tel":telText
  };
  console.log(Cardic);
  addPlacCar(Cardic);
});

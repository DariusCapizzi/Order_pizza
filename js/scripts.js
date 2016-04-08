
// ui
$(function(){

  var topping = $("input").val()

  console.log(topping)
  

})


//the bizz
function Pizza(){
  this.toppings = [];
  this.bigness = 0;
  this.cost = 0;
}

Pizza.prototype.cost = function (howMuch, howBig) {
  // toppings and size
  this.toppings
};

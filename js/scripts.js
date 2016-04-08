
// ui
$(function(){

  //take input

  // size slider input,
  var size = 50
  $("#size").on("change", function(){
    size = $("#size").val();
    console.log( size)
  })

  // multiple toppings input (default value is peperone)
  var toppings = [$("#topping").val()]
  $("#newTopping").click(function(){
    toppings.push($("#topping").val())
    console.log(toppings)
  });


  // make new pizza with input
  $(".userIn").submit(function(e){
    e.preventDefault();

    var newPizza = new Pizza()
    console.log(newPizza)

    //determine size
    newPizza.bigness = size;

    //add toppings
    newPizza.stuffOnIt = toppings;
    console.log(newPizza)


    // save pizza?

    // reset fields?


    // print cost
    newPizza.findCost()
    $("#yourCost").text("your pizza will be: "+ newPizza.cost)
  });


}); //docready


//the bizz
function Pizza(){
  this.stuffOnIt = [];
  this.bigness = 0;
  this.cost = 0;
}

Pizza.prototype.findCost = function () {
  // stuffOnIt times bigness
  this.cost = this.stuffOnIt.length * this.bigness

};

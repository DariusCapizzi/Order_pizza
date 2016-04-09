
// ui
$(function(){

  // // uncomment for disgusting background and text shadow changing
  //
  // window.setInterval(function(){
  //   var images = ['background.JPG','background2.JPG', 'background3.jpg'];
  //   $('html').css({'background-image': 'url(imgs/' + images[Math.floor(Math.random() * images.length)] + ')'});
  // }, 1000)
  //
  // window.setInterval(function(){
  //   randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  //   $('body').css({'text-shadow': '2px -2px '+randomColor})
  //   var images = ['background.JPG','background2.JPG', 'background3.jpg','image1.png', 'image2.png', 'Pizza_Man.jpg','pizza_time.jpg'];
  //   $('div').css({'background-image': 'url(imgs/' + images[Math.floor(Math.random() * images.length)] + ')'});
  // }, 2000)

  //take input

  // size slider input,
  var size = 50
  $("#size").on("change", function(){
    size = $("#size").val();

    //image change size
    imageSize = parseInt(size) + 200
    $('#pizza').css('width' , imageSize  )
    $('#pizza').css('height' , imageSize )
  })



  // multiple toppings input
  var toppings = [];
  $("#newTopping").click(function(){
    $("#howMuch").show();
    toppings.push($("#topping").val())

    //the image randomly changes
    var images = ['image1.png', 'image2.png',"image3.gif","image4.png"];
    image = "imgs/" + images[Math.floor(Math.random() * images.length)]
    $('#pizza').attr('src' , image)
  });

  var image = ""

  // make new pizza with input
  $(".userIn").submit(function(e){
    e.preventDefault();
    var newPizza = new Pizza()

    //determine size
    newPizza.bigness = size;

    //add toppings
    newPizza.stuffOnIt = toppings;

    //save the pizza image
    newPizza.pizza = image

    // save pizza
    $("#savePizza").show()
    //what happens if parent event isnt active?
    $("#savePizza").click(function(){
      console.log($('#pizza').attr("src"))

      $("#savedPizzas").append("<p class='old-pizza'>" + newPizza.stuffOnIt + "</p>")
      //store pizza $('#pizza').attr


      var pizzaString = JSON.stringify(newPizza)
      $.cookie(newPizza.stuffOnIt, pizzaString)
      // save as spider


      //click for newly saved pizzas
      $(".old-pizza").last().click(function(){
        newPizza = new Pizza();
        var oldPizza = JSON.parse($.cookie($(this).text()))
        console.log(oldPizza)
        console.log(" is an new pizza")
        for (var i in oldPizza){
          newPizza[i] = oldPizza[i];
        }

        // need to add pizza image to new pizzas
      })



      // reset fields?
      newPizza = new Pizza;
      $("#savePizza").hide()
      $("#howMuch").hide();
    })





    // print cost
    newPizza.findCost()

    $("#yourCost").text("your pizza will be:  $" + newPizza.cost )
  });


  //recover old pizzas
  for(var i in $.cookie()) {
    $("#savedPizzas").prepend("<p class='old-pizza'>" + i + "</p>");
  }

  // click for older pizzas
  $(".old-pizza").click(function(){
    newPizza = new Pizza();
    var oldPizza = JSON.parse($.cookie($(this).text()))
    console.log(oldPizza)
    console.log(" is an old pizza")
    for (var i in oldPizza){
      newPizza[i] = oldPizza[i];
    }
    console.log(newPizza.pizza)
    $("#savedPizzas").prepend("<img class='old-pizza-image' src='" + newPizza.pizza + "'>");
    $(".old-pizza-image").css("position","fixed");
    Spider("old-pizza-image")
  })



  Spider("spider")



}); //docready


//the bizz
Spider = function(pizza){
  window_Height = window.innerHeight;
  window_Width = window.innerWidth;


  image_Elements = document.getElementsByClassName(pizza);

  for (i=0; i < image_Elements.length; i++){
    console.log(image_Elements[i])
    image_Element = image_Elements[i];
    image_Height = image_Element.clientHeight;
    image_Width = image_Element.clientWidth;

    availSpace_V = window_Height - image_Height;
    availSpace_H = window_Width - image_Width;

    setInterval(moveImage, 2000);
  }
}

function moveImage(){
  var randNum_V = Math.round(Math.random() * availSpace_V);
  var randNum_H = Math.round(Math.random() * availSpace_H);
  image_Element.style.top = randNum_V + "px";
  image_Element.style.left = randNum_H + "px";
}




function Pizza(){
  this.stuffOnIt = [];
  this.bigness = 0;
  this.cost = 0;
  this.pizza = "";
}

Pizza.prototype.findCost = function () {
  // stuffOnIt times bigness/5
  this.cost = this.stuffOnIt.length * (Math.floor(this.bigness/5))


  // we charge extra for peperone
  // for every topping
  for (i=0; i<this.stuffOnIt.length; i++){

    if (this.stuffOnIt[i] == "peperone"){
      this.cost += this.stuffOnIt[i].length

    }
  }




};

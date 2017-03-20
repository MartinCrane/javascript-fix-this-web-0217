var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!";
    updateFunction(status);
    setTimeout(() => {
      updateFunction(serve.call(this, "Happy Eating!", this.customer))
    }, 3000)
  }
}

var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy",
}

function makeCake() {
  var upcake = updateStatus.bind(this);
  function updateCakeStatus(status) {upcake(status, "cake")}
  mix.call(this, updateCakeStatus);
}

function makePie() {

  var uppie = updateStatus.bind(this);
  function updatePieStatus(status) {uppie(status, "pie")}
  pie.decorate = cake.decorate.bind(pie)
  mix.call(this, updatePieStatus)
}


function updateStatus(statusText, item) {
  document.getElementById(item).getElementsByClassName("status")[0].innerText = statusText;
}


function bake(updateFunction) {
  console.log("bake: " + this.name);
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  setTimeout(() => {
    cool.call(this, updateFunction)
  }, 2000)
  updateFunction(status)
}

function mix(updateFunction) {
  // console.log("mix: " + this.name);
  var status = "Mixing " + this.ingredients.join(", ")
  setTimeout(() => {
    bake.call(this, updateFunction)
  }, 2000)
  updateFunction(status)
}

function cool(updateFunction) {
  // console.log("cool: " + this.name);
  var status = "It has to cool! Hands off!"
  setTimeout(() => {
    this.decorate(updateFunction)
  }, 2000)
  updateFunction(status);
}

function makeDessert() {
  if (this.innerText == "Make Cake") {
    makeCake.call(cake);
  } else if (this.innerText == "Make Pie") {
    makePie.call(pie);
  } else {

  }
  //add code here to decide which make... function to call
  //based on which link was clicked
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});

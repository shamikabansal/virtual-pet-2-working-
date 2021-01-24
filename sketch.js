//Create variables here
var dog, doghappy;
var database;
var foodS, foodstock ;
var dogimg;
//var x;
var feed, addFood;
var foodObj;
var fedTime, lastFed;





function preload()
{
dogimg = loadImage("images/dogimg.png");
happyDog = loadImage("images/dogimg1.png")
}

function setup() {

database = firebase.database();
 
createCanvas(500, 500);
  
 foodObj = new Food();
 
 foodstock = database.ref('food');
 foodstock.on("value", readStock);


 dog = createSprite(450,430,20,20);
  dog.addImage(dogimg); 
  dog.scale = 0.2;
  

   
 

  feed = createButton("Feed the dog");
  feed.position(520, 150);
 feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(420,150);
 addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87);
  
  foodObj.display();
 

  
  drawSprites();  
 
  strokeWeight();
  stroke("red");
   
  textSize(30);
  fill("red");
  text("Food Remaining:" + foodS, 50,80); 

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed = data.val();
  });

  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);
  }


  
}



function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
  
 
}


 function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    food: foodS
  })
}

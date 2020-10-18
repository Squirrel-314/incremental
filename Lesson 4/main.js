//==========================================================
//Game Data
//==========================================================

var initialGameData = {
  cheese: 0,

  clickCheese: 1,
  cowCost: 10,
  cowCount: 1,

  chefPrice: 75,
  chefProfit: 5,
  chefCheese: 0,
  chefCount: 0,

  factoryPrice: 500,
  factoryProfit: 25,
  factoryCheese: 0,
  factoryCount: 0,

  a1: 1,
  a1Price: 75,
  a2: 1,
  a2Price: 150,
  b1: 1,
  b1Price: 250,
  b2: 1,
  b2Price: 500,
  c1: 1,
  c1Price: 1000,
  c2: 1,
  c2Price: 2000,

  lastTick: Date.now(),
}

var gameData = initialGameData

//==========================================================
//Profit
//==========================================================

function cheesePerSecond() {
  return gameData.chefCheese + gameData.factoryCheese
}

function moreCheese() {
  gameData.cheese += gameData.clickCheese
  document.getElementById("cheeseAmount").innerHTML = gameData.cheese + " Cheese!"
}

//==========================================================
//Purchase Buildings
//==========================================================

function buyCow() {
  if (gameData.cheese >= gameData.cowCost) {
    gameData.cheese -= gameData.cowCost
    gameData.cowCost *= 2
    gameData.cowCount += 1
    gameData.clickCheese += 1
    document.getElementById("cowInfo").innerHTML = "A nice cow to give you fresh milk for your dairy products<br>+1 cheese per click<br>Cost " + gameData.cowCost + " Cheese<br>You have " + gameData.cowCount + "<br>Moo!"
    document.getElementById("cheeseAmount").innerHTML = gameData.cheese + " Cheese!"
  }
}
function hireChef() {
  if (gameData.cheese >= gameData.chefPrice) {
    gameData.cheese -= gameData.chefPrice
    gameData.chefPrice = (75 * Math.pow(1.15, gameData.chefCount)).toFixed(0)
    gameData.chefPrice *= 2
    gameData.chefCount += 1
    gameData.chefCheese += gameData.chefProfit
    document.getElementById("chefInfo").innerHTML = "A chef that makes cheese<br>Cost " + gameData.chefPrice + " Cheese<br>" + gameData.chefProfit + " CPS each<br>Producing " + gameData.chefCheese + " CPS<br>You have " + gameData.chefCount
    document.getElementById("cheeseAmount").innerHTML = gameData.cheese + " Cheese!"
  }
}
function buyFactory() {
  if (gameData.cheese >= gameData.factoryPrice) {
    gameData.cheese -= gameData.factoryPrice
    gameData.factoryPrice = (500 * Math.pow(1.15, gameData.factoryCount)).toFixed(0)
    gameData.factoryCount += 1
    gameData.factoryCheese += gameData.factoryProfit
    document.getElementById("factoryInfo").innerHTML = "A factory that mass produces cheese<br>Cost " + gameData.factoryPrice + " Cheese<br>" + gameData.factoryProfit + " CPS each<br>Producing " + gameData.factoryCheese + " CPS<br>You have " + gameData.factoryCount
    document.getElementById("cheeseAmount").innerHTML = gameData.cheese + " Cheese!"
  }
}

//==========================================================
//Main Game Loop and Save
//==========================================================

var mainGameLoop = window.setInterval(function() {
  diff = Date.now() - gameData.lastTick;
  gameData.lastTick = Date.now()
  gameData.cheese += Math.round(cheesePerSecond() * (diff / 1000))
  document.getElementById("cheeseAmount").innerHTML = gameData.cheese + " Cheese!"
  document.title = gameData.cheese + " Cheese!";
  document.getElementById("clickity").innerHTML = gameData.clickCheese + " Cheese per Click!"
  document.getElementById("cps").innerHTML = cheesePerSecond() + " Cheese per Second!"
}, 1000)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("cheeseClickerSave", JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("cheeseClickerSave"))
if (savegame !== null) {
  gameData = savegame
}

//==========================================================
//Settings
//==========================================================

function restart() {
  var r = confirm("Are you SURE you want to restart? This will wipe all your progress!");
  if (r == true) {
     var rr = confirm("Are you REALLY SURE you want to restart? There is no going back!");
     if (rr == true) {
       gameData = initialGameData
       localStorage.setItem("cheeseClickerSave", JSON.stringify(gameData))
       document.location.href = ("")
     }
  }
}

function save() {
  localStorage.setItem("cheeseClickerSave", JSON.stringify(gameData))
}

//==========================================================
//Setup
//==========================================================

function gameSetup() {
  document.getElementById("cowInfo").innerHTML = "A nice cow to give you fresh milk for your dairy products<br>+1 cheese per click<br>Cost " + gameData.cowCost + " Cheese<br>You have " + gameData.cowCount + "<br>Moo!"
  document.getElementById("chefInfo").innerHTML = "A chef that makes cheese<br>Cost " + gameData.chefPrice + " Cheese<br>" + gameData.chefProfit + " CPS each<br>Producing " + gameData.chefCheese + " CPS<br>You have " + gameData.chefCount
  document.getElementById("factoryInfo").innerHTML = "A factory that mass produces cheese<br>Cost " + gameData.factoryPrice + " Cheese<br>" + gameData.factoryProfit + " CPS each<br>Producing " + gameData.factoryCheese + " CPS<br>You have " + gameData.factoryCount
}

window.onload = gameSetup

//==========================================================
//Upgrades
//==========================================================

var checkForUpgrades = window.setInterval(function() {
  if (gameData.cowCount >= 1 && gameData.a1 == 1) {
    document.getElementById("a1").style.display = "block";
  }
  if (gameData.cowCount >= 5 && gameData.a2 == 1) {
    document.getElementById("a2").style.display = "block";
  }

  if (gameData.chefCount >= 1 && gameData.b1 == 1) {
    document.getElementById("b1").style.display = "block";
  }
  if (gameData.chefCount >= 5 && gameData.b2 == 1) {
    document.getElementById("b2").style.display = "block";
  }

  if (gameData.factoryCount >= 1 && gameData.c1 == 1) {
    document.getElementById("c1").style.display = "block";
  }
  if (gameData.factoryCount >= 5 && gameData.c2 == 1) {
    document.getElementById("c2").style.display = "block";
  }
}, 3000)

function a1() {
  if (gameData.cheese >= gameData.a1Price) {
    gameData.cheese -= gameData.a1Price
    gameData.clickCheese *= 2
    gameData.a1 = 2
    document.getElementById("a1").style.display = "none";
    document.getElementById("cheeseAmount").innerHTML = gameData.cheese + " Cheese!"
  }
}
function a2() {
  if (gameData.cheese >= gameData.a2Price) {
    gameData.cheese -= gameData.a2Price
    gameData.clickCheese *= 2
    gameData.a2 = 2
    document.getElementById("a2").style.display = "none";
    document.getElementById("cheeseAmount").innerHTML = gameData.cheese + " Cheese!"
  }
}

function b1() {
  if (gameData.cheese >= gameData.b1Price) {
    gameData.cheese -= gameData.b1Price
    gameData.chefProfit *= 2
    gameData.chefCheese *= 2
    gameData.b1 = 2
    document.getElementById("b1").style.display = "none";
    document.getElementById("cheeseAmount").innerHTML = gameData.cheese + " Cheese!"
    document.getElementById("chefInfo").innerHTML = "A chef that makes cheese<br>Cost " + gameData.chefPrice + " Cheese<br>" + gameData.chefProfit + " CPS each<br>Producing " + gameData.chefCheese + " CPS<br>You have " + gameData.chefCount
  }
}
function b2() {
  if (gameData.cheese >= gameData.b2Price) {
    gameData.cheese -= gameData.b2Price
    gameData.chefProfit *= 2
    gameData.chefCheese *= 2
    gameData.b2 = 2
    document.getElementById("b2").style.display = "none";
    document.getElementById("cheeseAmount").innerHTML = gameData.cheese + " Cheese!"
    document.getElementById("chefInfo").innerHTML = "A chef that makes cheese<br>Cost " + gameData.chefPrice + " Cheese<br>" + gameData.chefProfit + " CPS each<br>Producing " + gameData.chefCheese + " CPS<br>You have " + gameData.chefCount
  }
}

function c1() {
  if (gameData.cheese >= gameData.c1Price) {
    gameData.cheese -= gameData.c1Price
    gameData.factoryProfit *= 2
    gameData.factoryCheese *= 2
    gameData.c1 = 2
    document.getElementById("c1").style.display = "none";
    document.getElementById("cheeseAmount").innerHTML = gameData.cheese + " Cheese!"
    document.getElementById("factoryInfo").innerHTML = "A factory that mass produces cheese<br>Cost " + gameData.factoryPrice + " Cheese<br>" + gameData.factoryProfit + " CPS each<br>Producing " + gameData.factoryCheese + " CPS<br>You have " + gameData.factoryCount
  }
}
function c2() {
  if (gameData.cheese >= gameData.c2Price) {
    gameData.cheese -= gameData.c2Price
    gameData.factoryProfit *= 2
    gameData.factoryCheese *= 2
    gameData.c2 = 2
    document.getElementById("c2").style.display = "none";
    document.getElementById("cheeseAmount").innerHTML = gameData.cheese + " Cheese!"
    document.getElementById("factoryInfo").innerHTML = "A factory that mass produces cheese<br>Cost " + gameData.factoryPrice + " Cheese<br>" + gameData.factoryProfit + " CPS each<br>Producing " + gameData.factoryCheese + " CPS<br>You have " + gameData.factoryCount
  }
}

//==========================================================
//Dark Theme
//==========================================================

function dark() {
   document.body.style.background = "#383838";
   document.getElementById("invests").style.background = "#828282";
   document.getElementById("researchs").style.background = "#828282";
   document.getElementById("cowInfo").style.background = "#d0d0d0";
   document.getElementById("chefInfo").style.background = "#d0d0d0";
   document.getElementById("factoryInfo").style.background = "#d0d0d0";

   var all = document.getElementsByClassName('UP');
   for (var i = 0; i < all.length; i++) {
      all[i].style.color = '#fff';
      all[i].style.fontFamily = 'times';
      all[i].style.border = 'ridge 5px lightblue';
      all[i].style.padding = '5px';
      all[i].style.backgroundColor = "#595959";
   }
}

function light() {
  document.location.href = ("")
}

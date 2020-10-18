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
//Setup
//==========================================================

function gameSetup() {
  document.getElementById("cowInfo").innerHTML = "A nice cow to give you fresh milk for your dairy products<br>+1 cheese per click<br>Cost " + gameData.cowCost + " Cheese<br>You have " + gameData.cowCount + "<br>Moo!"
  document.getElementById("chefInfo").innerHTML = "A chef that makes cheese<br>Cost " + gameData.chefPrice + " Cheese<br>" + gameData.chefProfit + " CPS each<br>Producing " + gameData.chefCheese + " CPS<br>You have " + gameData.chefCount
  document.getElementById("factoryInfo").innerHTML = "A factory that mass produces cheese<br>Cost " + gameData.factoryPrice + " Cheese<br>" + gameData.factoryProfit + " CPS each<br>Producing " + gameData.factoryCheese + " CPS<br>You have " + gameData.factoryCount
}

window.onload = gameSetup

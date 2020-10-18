//==========================================================
//Game Data
//==========================================================

var initialGameData = {
  cheese: 0,

  clickCheese: 1,
}

var gameData = initialGameData

//==========================================================
//Profit
//==========================================================

function moreCheese() {
  gameData.cheese += gameData.clickCheese
  document.getElementById("cheeseAmount").innerHTML = gameData.cheese + " Cheese!"
}

$(document).ready(function() {
  var boardCount = 0
  var x = "x"
  var o = "o"
  var count = 0
  var o_win_count = 0
  var x_win_count = 0
  var o_win = false
  var x_win = false
  var winCon
  
  $("#startGame").click(function(){
  	boardStart()
    
    $('#game td').click(function() {
      if (o_win) {
        circleWin()
      } else if (x_win) {
        crossWin()
      } else {
        playerMove($(this))
      }

    });
  })

  function boardStart() {
    document.getElementById("game").innerHTML = ""
    boardCount = document.getElementById("boardSize").value
    if (boardCount == "" || isNaN(boardCount) || boardCount < 3) {
      alert("Board Size must be a number and at least 3!")
    }
    else {
    	generateBoard(boardCount)
    	winCon = generateWinningCondition(boardCount)
      console.log(winCon)
    }
    
  }


  function generateBoard(board) {
    var numTiles = board * board
    var tileCount = 0;
    for (var row = 0; row < board; row++) {
      var rows = document.createElement("tr")
      for (var col = 0; col < board; col++) {
        var tile = document.createElement("td")
        tile.setAttribute("id", "tile" + tileCount)
        tile.setAttribute("class", "btn tile")
        tile.innerHTML = "+"
        rows.appendChild(tile)
        tileCount++
      }
      document.getElementById("game").appendChild(rows)
    }
  }

  function generateWinningCondition(board) {
    var winConCount = (board * 2) + 2
    var tileCount = 0
    var winningCondition = []

    // Horizontal Winning Condition
    for (var i = 0; i < board; i++) {
      var cond = []
      for (var j = 0; j < board; j++) {
        cond.push('#tile' + tileCount + '.SHAPE')
        tileCount++
      }
      cond.join(',')
      winningCondition.push(cond)
    }
    tileCount = 0

    //Vertical Winning Condition
    for (var i = 0; i < board; i++) {
      var condV = []
      for (var j = 0; j < board; j++) {
        condV.push('#tile' + tileCount + '.SHAPE')
        tileCount += +board
      }
      condV.join(',')
      winningCondition.push(condV)
      tileCount = 0
      tileCount += +i + 1
    }
    tileCount = 0

    //First Diagonal Winning Condition
    var condDiag1 = []
    for (var j = 0; j < board; j++) {
      condDiag1.push('#tile' + tileCount + '.SHAPE')
      tileCount += +board + 1
    }
    condDiag1.join(',')
    winningCondition.push(condDiag1)

    //Second Diagonal Winning Condition
    var condDiag2 = []
    tileCount = board - 1
    for (var j = 0; j < board; j++) {
      condDiag2.push('#tile' + tileCount + '.SHAPE')
      tileCount += +board - 1
    }
    condDiag2.join(',')
    winningCondition.push(condDiag2)

    return winningCondition
  }

  function resetBoard() {
    $("#game td").text("+");
    $("#game td").removeClass('disable')
    $("#game td").removeClass('o')
    $("#game td").removeClass('x')
    $("#game td").removeClass('btn-primary')
    $("#game td").removeClass('btn-info')
    o_win = false
    x_win = false
  }

  function playerMove(objTile) {
    if (count == boardCount * boardCount) {
      tie();
    } else if (objTile.hasClass('disable')) {
      alert('Already selected')
    } else if (count % 2 == 0) {
      count++
      objTile.text(o)
      objTile.addClass("disable o btn-primary")
      calculateWin(winCon)
    } else {
      count++
      objTile.text(x)
      objTile.addClass("disable x btn-info")
      calculateWin(winCon)
    }
  }

  function calculateWin(winCond) {
    var circleWinArray = getWinningArray(winCond, "o")
    var crossWinArray = getWinningArray(winCond, "x")
    
    console.log("CircleWin: "+circleWinArray)
    var circleWins = circleWinArray.includes(true)
    var crossWins = crossWinArray.includes(true)

    if (circleWins) {
      alert('O Wins')
      count = 0
      o_win_count++
      $('#o_win').text(o_win_count)
      o_win = true

    } else if (crossWins) {
      alert('X Wins')
      count = 0
      x_win_count++
      $('#x_win').text(x_win_count)
      x_win = true
    }
  }

  function getWinningArray(array, string) {
    return array.map(function(combo) {
      var combo2 = combo.join(',')
      
      var eachCombo = combo2.replace(/SHAPE/g, string)
      console.log($(eachCombo).length)
      eachCombo = $(eachCombo).length === +boardCount
      /* console.log(eachCombo) */
      return eachCombo
    })
  }

  function circleWin() {
    alert('O has won the game. Start a new game')
    resetBoard()
  }

  function crossWin() {
    alert('X wins has won the game. Start a new game')
    resetBoard()
  }

  function tie() {
    alert('Its a tie. It will restart.')
    resetBoard()
    count = 0
  }

  $("#reset").click(function() {
    resetBoard()
    count = 0
  });
});

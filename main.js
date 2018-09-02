var score = 0;
var board = new Array();
$(function () {
    newGame();
})


function newGame() {
    init();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j)
            gridCell.css('top', getPosTop(i, j))
            gridCell.css('left', getPosLeft(i, j))
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);
            theNumberCell.css('width', '0px');
            theNumberCell.css('height', '0px');
            theNumberCell.css('top', getPosTop(i, j));
            theNumberCell.css('left', getPosLeft(i, j));
        }
    }
    generateOneNumber()
    generateOneNumber()
}

$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37:
            if (moveLeft()) {
                updateBoardView()
            }
            break;
        case 38:
            if (moveUp()) {
                updateBoardView()
            }
            break;
        case 39:
            if (moveRight()) {
                updateBoardView()
            }
            break;
        case 40:
            if(moveDown()){
                updateBoardView()
            }
            break;
    }
})
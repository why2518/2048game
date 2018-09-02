function updateBoardView() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var theNumberCell = $('#number-cell-' + i + '-' + j);
            if (board[i][j] != 0) {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('backgroundColor', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            else {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.text('');
            }
        }
    }
    generateOneNumber()
}

function generateOneNumber() {
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randx][randy] == 0)
            break;
        //位置
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
    return true;
}

function getPosTop(i, j) {
    return 20 + i * 120;
}

function getPosLeft(i, j) {
    return 20 + j * 120;
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f26179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e36";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#3365a5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6bc";
            break;
        case 8192:
            return "#93c";
            break;
    }
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "white";
}

function noBlockHorizontal(row, col1, col2, board) {
    //board[row][col1]    board[row][col2]
    //从col1右边一直到col2左边如果中间有东西就判断为有障碍物，返回false
    for (col1 + 1; col1 + 1 < col2; col1++) {
        if (board[row][col1 + 1] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical(col, row1, row2, board) {
    //board[row1][col]    board[row2][col]
    //从row1一直到row2下边如果中间有东西就判断为有障碍物，返回false
    for (row1 + 1; row1 + 1 < row2; row1++) {
        if (board[row1 + 1][col] != 0) {
            return false;
        }
    }
    return true;
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {  //123
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {  //012
                    if (board[i][k] == 0) return true;   // 该方块的左边有空档
                }
                if (board[i][j] == board[i][j - 1]) return true;
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {  //123
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {  //012
                    if (board[i][k] == 0) return true;   // 该方块的左边有空档
                }
                if (board[i][j] == board[i][j + 1]) return true;
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0) return true;   // 该方块的上边有空档
                }
                if (board[i][j] == board[i - 1][j]) return true;
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0) return true;   // 该方块的下边有空档
                }
                if (board[i][j] == board[i + 1][j]) return true;
            }
        }
    }
    return false;
}

function moveLeft() {
    if (!canMoveLeft(board)) {
        return false
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {  //23      20  21 22
                for (var k = 0; k < j; k++) {
                    //数字左边没有数
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        // showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //数字左边有值且相等
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        // showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }

                }
            }
        }
    }
    return true
}


function moveRight() {
    if (!canMoveRight(board)) {
        return false
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    //数字RIght边没有数
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        // showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //数字左边有值且相等
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        // showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }

                }
            }
        }
    }
    return true
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false
    }
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    //数字上边没有数
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        // showMoveAnimation(i, j, i, k);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //数字左边有值且相等
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)) {
                        // showMoveAnimation(i, j, i, k);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }

                }
            }
        }
    }
    return true
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false
    }
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    //数字下边没有数
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        // showMoveAnimation(i, j, i, k);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //数字左边有值且相等
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board)) {
                        // showMoveAnimation(i, j, i, k);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        continue;
                    }

                }
            }
        }
    }
    return true
}

function showMoveAnimation(row, col1, row, col2) {
    var newNumberCell = $("#number-cell-" + row + "-" + col2)
    var oldNumberCell = $("#number-cell-" + row + "-" + col1)
    // oldNumberCell.css('left',getPosLeft(row,col2))
}

function showNumberWithAnimation(i, j, randNumber) {
    var theNumberCell = $("#number-cell-" + i + "-" + j)
    theNumberCell.css('color', getNumberColor(randNumber))
    theNumberCell.text(randNumber)
    theNumberCell.css({
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j),
    })
    theNumberCell.css('backgroundColor', getNumberBackgroundColor(parseInt(theNumberCell.text())))
}
let player = "O", opponent = "X";
let winning = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9]
];

function isGameOver(gameState) {
    let flag = true;
    for(let i=1 ; i<gameState.length ; i++){
        if(gameState[i] == "")
            return false;
    }
    return true;
}

function evaluate(gameState, player, opponent) {
    for(let i = 0 ; i < winning.length ; i++){
        if(gameState[winning[i][0]] == gameState[winning[i][1]] && gameState[winning[i][1]] == gameState[winning[i][2]]){
            if(gameState[winning[i][0]] == player)
                return 10;
            else if(gameState[winning[i][0]] == opponent)
                return -10;
        }
    }
    return 0;
}

function minimax(gameState, depth, isMaximising) {
    let score = evaluate(gameState, player, opponent);
    if(score == 10)
        return score-depth;
    if(score == -10)
        return score+depth;
    if(isGameOver(gameState))
        return 0;
    if(isMaximising){
        let bestVal = -Infinity;
        for(let i=1 ; i<gameState.length ; i++){
            if(gameState[i] == ""){
                gameState[i] = player;
                bestVal = Math.max(minimax(gameState, depth+1, false), bestVal);
                gameState[i] = "";
            }
        }
        return bestVal;
    }
    else{
        let bestVal = Infinity;
        for(let i=1 ; i<gameState.length ; i++){
            if(gameState[i] == ""){
                gameState[i] = opponent;
                bestVal = Math.min(minimax(gameState, depth+1, true), bestVal);
                gameState[i] = "";
            }
        }
        return bestVal;
    }
}

function calBestMove(gameState) {
    let bestScore = -Infinity, bestMove;
    for(let i=1 ; i<gameState.length ; i++) {
        if(gameState[i] == ""){
            gameState[i] = player;
            let score = minimax(gameState, 0, false);
            if(score > bestScore){
                bestScore = score;
                bestMove = i;
            }
            gameState[i] = "";
        }
    }
    return bestMove;
}
const box = document.querySelector('.grid-container');
const result = document.getElementById('result');
const restart = document.querySelector('.restart');
const select = document.querySelector('.select-box');
const selButton = document.querySelector('.selButton');
let gameover = false;
let player1 = "X", opponent1 = "O", currentplayer = "X";
let gameState = ["", "", "", "", "", "", "", "", "", ""];
let gameType = "none";

function updateTwoPlayer(id) {
    if(gameState[id] != "")
        return;
    document.getElementById(id).innerHTML = `<h1 class="${currentplayer}-styling">${currentplayer}</h1>`;
    gameState[id] = currentplayer;
    let score = evaluate(gameState, player1, opponent1);
    if(score == 10 || score == -10){
        result.innerHTML = `<span>${currentplayer} has won the game</span><br>`;
        gameover = true;
        return;
    }
    if(isGameOver(gameState)){
        result.innerHTML = `<span>It is a Draw</span><br>`;
        return;
    }
    if(currentplayer == player1)
        currentplayer = opponent1;
    else
        currentplayer = player1;
}

function updateSinglePlayer(id) {
    if(gameState[id] != "")
        return;
    document.getElementById(id).innerHTML = `<h1 class="${player1}-styling">${player1}</h1>`;
    gameState[id] = player1;
    if(evaluate(gameState, player1, opponent1) == 10){
        result.innerHTML = `<span>${player1} has won the game</span><br>`;
        gameover = true;
        return;
    }
    if(isGameOver(gameState)){
        result.innerHTML = `<span>It is a Draw</span><br>`;
        return;
    }
    let nextMove = calBestMove(gameState);
    gameState[nextMove] = opponent1;
    document.getElementById(nextMove).innerHTML = `<h1 class="${opponent1}-styling">${opponent1}</h1>`;
    if(evaluate(gameState, player1, opponent1) == -10){
        result.innerHTML = `<span>${opponent1} has won the game</span><br>`;
        gameover = true;
        return;
    }
}

box.addEventListener('click', e => {
    if(isGameOver(gameState) || gameover || gameType == "none")
        return;
    if(gameType == "singlePlayer")
        updateSinglePlayer(e.target.id);
    else
        updateTwoPlayer(e.target.id);
});

restart.addEventListener('click', e =>{
    currentplayer = "X";
    gameover = false;
    for(let i=1 ; i<gameState.length ; i++)
        gameState[i] = "";
    for(let i=0 ; i<9 ; i++){
        box.children[i].innerHTML = "";
        console.log(i);
    }
    result.innerHTML = "";
});

selButton.addEventListener('click', e => {
    e.preventDefault();
    gameType = select.value;
    if(gameType == "none")
        return;
});
const box = document.querySelector('.grid-container');
const result = document.getElementById('result');
const restart = document.querySelector('.restart');
let gameover = false;
let player1 = "X", opponent1 = "O";
let gameState = ["", "", "", "", "", "", "", "", "", ""];

function updateUI(id) {
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
    if(!isGameOver(gameState) && !gameover)
        updateUI(e.target.id);
});

restart.addEventListener('click', e =>{
    location.reload();
});
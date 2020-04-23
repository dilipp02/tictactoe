const box = document.querySelector('.grid-container');
const restart = document.querySelector('.restart');
let currentplayer = "";
let gameover = false;
let gameState = ["", "", "", "", "", "", "", "", "", ""];
let winning = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9]
]

function updateUI (id) {
    const cell = document.getElementById(id);
    cell.innerHTML = `<h1 class="${currentplayer}-styling">${currentplayer}</h1>`;
};

function calculateResult(id) {
    let flag = false;
    let flag1 = true;
    for(let i = 0 ; i < winning.length ; i++){
        let cnt=0;
        for(let j = 0 ; j < 3 ; j++){
            if(gameState[winning[i][j]] === currentplayer)
                cnt++;
            else
                break;
        }
        if(cnt == 3){
            document.getElementById('result').innerHTML = `<span>${currentplayer} has won the game</span><br>`;
            flag=true;
            break;
        }
    }
    if(flag == false){
        for(let i = 1 ; i <= 9 ; i++){
            if(gameState[i] === ""){
                flag1=false;
                break;
            }
        }
        console.log(flag1);
        if(flag1)
            document.getElementById('result').innerHTML = '<span>It is a draw</span><br>';
    }
    if(flag || flag1){
        gameover = true;
        document.getElementById('result').innerHTML += `<span>Press restart to play new game</span>`;
    }
}

function playerHandling(id) {
    if(gameState[id]!=""){
        return;
    }
    if(currentplayer === "" || currentplayer === "O")
        currentplayer = "X";
    else
        currentplayer = "O";
    gameState[id] = currentplayer;
    updateUI(id);
    calculateResult();
}

box.addEventListener('click', e => {
    if(!gameover)
        playerHandling(e.target.id);
});

restart.addEventListener('click', e =>{
    location.reload();
});
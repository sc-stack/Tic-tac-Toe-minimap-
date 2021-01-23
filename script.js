const Player = (marker, turn, name) => {
    const getTurn = () => {
        return turn;
    }
    const getMarker = () => {
        return marker;
    }
    const getName = () => {
        return name;
    }
    const changeTurn = () =>{
        turn = !turn;
    }
    return{getTurn, getName, changeTurn};
};
let GameBoard = (function(){
    const player1 = ('x', true, "Player One");
    const player2 = ('o', false, "Player Two");
    let gameBoard;
    let init = () =>{
        gameBoard =  [
            ["","",""],
            ["","",""],
            ["","",""],
        ];
        makeGrid();
        console.log("has been reset");
    };
    let changeTurns = () =>{
        player1.changeTurn();
        player2.changeTurn();
    }
    let makeGrid = () => {
        const container = document.querySelector('#container');
        container.setAttribute('style', `grid-template-columns : repeat(${3}, 1fr); grid-template-rows : repeat(${3}, 1fr)`);
        for(let i = 0; i < 3 ; i++){
            for(let x = 0 ; x < 3; x++){ 
            const div = document.createElement('div');
            div.setAttribute('data-column', x);
            div.setAttribute('data-row', i);
            div.classList.add('cell');
            container.appendChild(div);
            }
        }

    }
    const checkWin = () =>{
        //horizontals and vertical
        for(let i = 0; i < gameBoard.length; i++){
            let row = gameBoard[i];
            if(gameBoard[i][0] == gameBoard[i][1] == gameBoard[i][2]){
                return true;
            }
            for(let x = 0; x< row.length; x++){
                if(gameBoard[0][x] && gameBoard[1][x] && gameBoard[2][x]){
                    return true;
                }
            }
        }
    }
    //runs the game
    const runGame = () => {
        const divs = document.querySelectorAll('div');
        for(let i = 0; i < divs.length; i++){
            if(checkWin()){
                break;
            }
            const div = divs[i];
            div.addEventListener('click', () => {
                const column = div.getAttribute('data-column');
                const row = div.getAttribute('data-row');
                let turn = player1.getTurn(); 
                if(gameBoard[row][column] == "" && turn){
                    div.innerHTML = player1.getMarker();
                    changeTurns();
                }else if(gameBoard[row][column] == "" && !turn){
                    div.innerHTML = player2.getMarker();
                    changeTurns();
                }
            });
        }
    }
    return{
        init, runGame,
    };
})();
GameBoard.init();
GameBoard.runGame();

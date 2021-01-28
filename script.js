const Game = (function(){
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
        const setTurn = (turn) =>{
            this.turn = turn; 
        }
        return{getTurn, getName, changeTurn, getMarker, setTurn};
    };
    const Computer = (marker, turn, name) => {
        const getTurn = () => {
            return true;
        }
        const getMarker = () => {
            return marker;
        }
        const placeMarker = (gameBoard, val1, val2) =>{
        let randRow = Math.floor(Math.random() * (3));
        let randCol = Math.floor(Math.random() * (3));
        while(gameBoard[randRow][randCol] != ""){
                randRow = Math.floor(Math.random() * 3);
                randCol = Math.floor(Math.random() * 3);
        }
        gameBoard[randRow][randCol] = getMarker();
        console.log(val1 + " " + " before");
        console.log(val1 + " " + "after");
        function getRow(){
            return val1;
        }
        function getCol(){
            return val2;
        }
        }
        const getName = () => {
            return name;
        }
        const changeTurn = () =>{
            turn = !turn;
        }
        return{getTurn, getName, changeTurn, getMarker, placeMarker};
    }
    let GameBoard = (function(){
        const player1 = Player('x', true, "Player One");
        const player2 = Player('o', false, "Player Two");
        const AI = Computer("o", false, "CPU");
        let gameBoard = [
            ["","",""],
            ["","",""],
            ["","",""],
        ];
        //initializes the gameBoard
        let init = () =>{
            makeGrid();
            console.log("has been reset");
        };
        let changeTurns = () =>{
            player1.changeTurn();
            AI.changeTurn();
        }
        let reset = () =>{
            const divs = document.querySelectorAll('div');
            for(let i = 0; i < divs.length; i++){
                const div = divs[i];
                div.innerHTML = "";
                gameBoard = [
                    ["","",""],
                    ["","",""],
                    ["","",""],
                ];
            }
            player1.setTurn(true);
            player2.setTurn(false);
            makeGrid();
            runGame();
        }
        let makeGrid = () => {
            const container = document.getElementById('container');
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
        const isFull = () => {
            if(!checkWin()){
                for(let i = 0; i < gameBoard.length; i++){
                    let row = gameBoard[i];
                    for(let x = 0; x < row.length; x++){
                        if(row[x] == "") return false;
                    }
                }
                return true;
            }
            return false;
        }
        const checkWin = () =>{
            //horizontals and vertical
            for(let i = 0; i < gameBoard.length; i++){
                let row = gameBoard[i];
                if(gameBoard[i][0] == gameBoard[i][1] &&  gameBoard[i][1] == gameBoard[i][2]){
                    if(gameBoard[i][0] != "") return true;
                }
                for(let x = 0; x< row.length; x++){
                    if(gameBoard[0][x] == gameBoard[1][x] && gameBoard[1][x] == gameBoard[2][x]){
                        if(gameBoard[0][x] != "") return true;
                    }
                }
            }
            //diagonals
            return (gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2] && gameBoard[1][1] != "") || (gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0] && gameBoard[1][1] != "");
        }
        //runs the game
        const getGameBoard = () => {
            return gameBoard;
        }
        const getDiv = (val, val2) =>{
            const divs = document.querySelectorAll('div');
            for(let i = 0; i < divs.length; i++){
                const div = divs[i];
                if(div.getAttribute('data-row') == val && div.getAttribute('data-column') == val2){
                    return div;
                }
            }
            return;
        }
        const runGame = () => {
            const divs = document.querySelectorAll('div');
            for(let i = 0; i < divs.length; i++){
                const div = divs[i];
                div.addEventListener('click', () => {
                    if(checkWin() || isFull()){
                        console.log("win/full");
                        reset();
                    }else{
                    const column = div.getAttribute('data-column');
                    const row = div.getAttribute('data-row');
                    let turn = player1.getTurn(); 
                    if(gameBoard[row][column] == "" && turn){
                        div.innerHTML = player1.getMarker();
                        gameBoard[row][column] = player1.getMarker();
                        changeTurns();
                //     setTimeout(function(){
                //         AI.placeMarker(gameBoard, row, column);
                    //        const cpuDiv = getDiv(AI.placeMarker().getRow(), AI.placeMarker.getCol());
                    //        cpuDiv.innerHTML = AI.getMarker();
                //         changeTurns();
                //     }, 1000);
                    }else if(gameBoard[row][column] == "" && !turn){
                    div.innerHTML = player2.getMarker();
                    gameBoard[row][column] = player2.getMarker();
                    changeTurns();
                    }
                }
                });
            }
        }
        return{
            init, runGame, getGameBoard,
        };
    })();
    const displayController = (function(){
        const startScreen = () => {
            const container = document.getElementById('container');
            const gameBeginButton = document.createElement("button");
            gameBeginButton.classList.add('button');
            gameBeginButton.innerHTML = "Start The Game";
            gameBeginButton.addEventListener('click', () => {
                var e = document.querySelector("container"); 
                container.removeChild(gameBeginButton);
                var elem = document.getElementById('myBar');
                let progress =document.getElementById('progress');
                move();
                setTimeout(function(){ 
                    progress.removeChild(elem);
                    container.classList.add("container");
                    container.style.width = "30vw";
                    GameBoard.init();
                    GameBoard.runGame(); 
                }, 1000);
            });
            container.appendChild(gameBeginButton);
        }
        const move = () => {
            var i = 0;
            if (i == 0) {
                i = 1;
                var elem = document.getElementById("myBar");
                var width = 1;
                var id = setInterval(frame, 10);
                function frame() {
                  if (width >= 100) {
                    clearInterval(id);
                    i = 0;
                  } else {
                    width++;
                    elem.style.width = width + "%";
                  }
                }
              }
        }
        return{
            startScreen, 
        };
    })();

    return {GameBoard, Player, displayController};
})();
Game.displayController.startScreen();
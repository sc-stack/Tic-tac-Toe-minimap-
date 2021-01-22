let GameBoard = (function(){
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
    let makeGrid = () =>{
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
    return{
        init,
    };
})();
GameBoard.init();
//const Player = (name, )

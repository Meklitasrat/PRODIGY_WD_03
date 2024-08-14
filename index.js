window.addEventListener("DOMContentLoaded" , () =>{
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.dis-player');
    const resetButton = document.querySelector('#reset');
    const announer = document.querySelector(".announcer");

    let board = ['', '', '', '', '', '', '', '', '']
    let curentplayer = 'X'
    let isGameActive = true;

    const PlayerX_won = 'PLAYERX_WON'
    const PlayerO_Won = 'PLAYERO_WON'
    const Tie= 'TIE'


    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];


    function handleResultValidation(){
        let roundWon = false;

        for(let i= 0; i<=7; i++){
            const winCondition = winningConditions[i];
            const a  = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];

            if(a=== '' || b=== '' || c ===''){
                continue;
            }
            if(a===b && b===c){
                roundWon = true;
                break;
            }
        }

        if(roundWon){
            announce(curentplayer ==='X'? PlayerX_won : PlayerO_Won);
            isGameActive = false
            return;
        }

        if(!board.includes('')){
            announce(Tie)
        }
    }

    const announce = (type) =>{
        switch(type){
            case PlayerO_Won:
                announer.innerHTML = '<div class="mine"> Player <span class="playerO"> O </span> WON </div>'
                break;
            case PlayerX_won:
                announer.innerHTML = '<div class="mine"> Player <span class="playerX"> X </span> WON </div>'
                break;

            case Tie:
                announer.innerText = " TIE, Press the Reset button 👇 to Play again!"
        }
        announer.classList.remove('hide')
    };

    const isValidAction = (tile) =>{
        if(tile.innerText === 'X' || tile.innerText ==='O'){
            return false;
        }

        return true;
    }

    const updateBoard = (index)=>{
        board[index] = curentplayer
    }

    const changePlayer = () =>{
        playerDisplay.classList.remove(`player${curentplayer}`);
        curentplayer = curentplayer ==='X'? 'O' : 'X'
        playerDisplay.innerText = curentplayer
        playerDisplay.classList.add(`player${curentplayer}`);
    }

    const userAction = (tile , index) =>{
        if(isValidAction(tile) && isGameActive){
            tile.innerText = curentplayer
            tile.classList.add(`player${curentplayer}`);
            updateBoard(index)
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () =>{
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true
        announer.classList.add('hide');
        if(curentplayer === 'O'){
            changePlayer()
        }

        tiles.forEach(tile =>{
            tile.innerText = ''
            tile.classList.remove('PlayerX')
            tile.classList.remove('PlsyerO')
        })
    }

    tiles.forEach((tile, index) =>{
        tile.addEventListener('click' , () => userAction(tile , index))
    })

    resetButton.addEventListener('click' , resetBoard)

});
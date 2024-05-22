const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let board = Array(9).fill(null);

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    
    if (!board[index]) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        
        if (checkWin()) {
            setTimeout(() => alert(`${currentPlayer} wins!`), 10);
            return;
        } else if (board.every(cell => cell)) {
            setTimeout(() => alert('It\'s a draw!'), 10);
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentPlayer;
        });
    });
}

function restartGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}

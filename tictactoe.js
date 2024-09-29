$(document).ready(function () {
    let winCount = 0;
    let lossCount = 0;
    let tieCount = 0;
    let isGameActive = false;

    const updateScoreboard = () => {
        $('#winCount').text(winCount);
        $('#lossCount').text(lossCount);
        $('#tieCount').text(tieCount);

        // Check for 3 wins
        if (winCount >= 3) {
            window.location.href = 'scratch.html'; // Redirect to scratch card page
        }
    };

    $('.start').on('click', function () {
        startGame();
    });

    function startGame() {
        isGameActive = true;
        $('.cell').text(''); // Clear the board
        $('.cover').hide(); // Hide the game over overlay
    }

    $('.cell').on('click', function () {
        if (!isGameActive || $(this).text() !== '') return;

        $(this).text('X'); // Player's turn
        if (checkWin('X')) {
            winCount++;
            updateScoreboard();
            showGameOver('Player Wins!');
        } else if (checkTie()) {
            tieCount++;
            updateScoreboard();
            showGameOver('It\'s a Tie!');
        } else {
            // Simulate AI turn
            setTimeout(function () {
                aiTurn();
            }, 500);
        }
    });

    function aiTurn() {
        const emptyCells = $('.cell').filter((index, cell) => $(cell).text() === '');
        if (emptyCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            $(emptyCells[randomIndex]).text('O'); // AI's turn

            if (checkWin('O')) {
                lossCount++;
                updateScoreboard();
                showGameOver('AI Wins!');
            } else if (checkTie()) {
                tieCount++;
                updateScoreboard();
                showGameOver('It\'s a Tie!');
            }
        }
    }

    function checkWin(player) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return $('.cell').eq(index).text() === player;
            });
        });
    }

    function checkTie() {
        return $('.cell').filter((index, cell) => $(cell).text() === '').length === 0;
    }

    function showGameOver(message) {
        $('#scr_winner').text(message);
        $('#scoreWins').text(winCount);
        $('#scoreLosses').text(lossCount);
        $('#scoreTies').text(tieCount);
        $('.cover').show();
        isGameActive = false; // Stop the game
    }

    $('.reset').on('click', function () {
        winCount = 0;
        lossCount = 0;
        tieCount = 0;
        updateScoreboard();
        startGame();
    });

    $('.OK').on('click', function () {
        $('.cover').hide();
        startGame();
    });
});

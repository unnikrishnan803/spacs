document.getElementById('welcome-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get values from the form
    const name = document.getElementById('name').value;
    const group = document.getElementById('group').value;
    const className = document.getElementById('class').value;

    // Store values in local storage (optional)
    localStorage.setItem('playerName', name);
    localStorage.setItem('groupNumber', group);
    localStorage.setItem('class', className);

    // Redirect to Tic-Tac-Toe page
    window.location.href = 'tictactoe.html';
});

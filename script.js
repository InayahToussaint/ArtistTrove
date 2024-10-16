// script.js

// Function to get a random word from the list
function getRandomWord(wordList) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

// Add event listener to the button
document.getElementById('generateButton').addEventListener('click', () => {
    const randomMedium = getRandomWord(mediums);
    const randomAdj = getRandomWord(adjs);
    const randomNoun = getRandomWord(nouns);
    document.getElementById('randomMedium').textContent = randomMedium;
    document.getElementById('randomAdj').textContent = randomAdj;
    document.getElementById('randomNoun').textContent = randomNoun;
});
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedOptions = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((checkbox) => {
        selectedOptions.push(checkbox.value);
    });
    alert('Selected options: ' + selectedOptions.join(', '));
});
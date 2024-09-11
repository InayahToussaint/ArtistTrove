// script.js

// List of words to choose from
const words = [
    "pen", "pencil", "paint",
];

// Function to get a random word from the list
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

// Add event listener to the button
document.getElementById('generateButton').addEventListener('click', () => {
    const randomWord = getRandomWord();
    document.getElementById('randomWord').textContent = randomWord;
});
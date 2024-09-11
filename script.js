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
    document.getElementById('randomMedium').textContent = randomMedium;
    document.getElementById('randomAdj').textContent = randomAdj;
});

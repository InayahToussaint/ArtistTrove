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
    const randomTime = getRandomWord(times);
    const randomColor = getRandomWord(colors);
    const randomConcept = getRandomWord(concepts);
    document.getElementById('randomTime').textContent = randomTime;
    document.getElementById('randomColor').textContent = randomColor;
    document.getElementById('randomConcept').textContent = randomConcept;
});
 // Get reference to the reset button
 const resetButton = document.getElementById('resetButton');

 // Add click event listener to the button
 resetButton.addEventListener('click', function() {
     // Refresh the page when the reset button is clicked
     location.reload();
 });
 
 
 const dropzoneContainer = document.getElementById('dropzoneContainer');
 const addDropZoneButton = document.getElementById('addDropZone');
 const boxes = document.querySelectorAll('.box');
 const boxContainer = document.getElementById('boxContainer');
 let dropzoneCount = 0;
 const maxDropzones = 6;
 
 // Store original positions of boxes
 const originalPositions = {};

 boxes.forEach((box) => {
   originalPositions[box.id] = box.parentNode; // Store original container (boxContainer)
   // Drag start event
   box.addEventListener('dragstart', (e) => {
     e.dataTransfer.setData('text', e.target.id);
   });
 });

 // Add new drop zones 
 const createDropZone = () => {
   if (dropzoneCount >= maxDropzones) {
     alert('You can only add up to 6 drop zones.');
     return;
   }
   dropzoneCount++;

   const newDropzone = document.createElement('div');
   newDropzone.classList.add('dropzone');
   newDropzone.innerHTML = `
     <p>Drop Zone ${dropzoneCount}</p>
     <button class="close-btn">X</button>
   `;

   dropzoneContainer.appendChild(newDropzone);

   // Allow drop in drop zone
   newDropzone.addEventListener('dragover', (e) => {
     e.preventDefault(); // Allow drop
   });

   newDropzone.addEventListener('drop', (e) => {
     e.preventDefault();
     const boxId = e.dataTransfer.getData('text');
     const box = document.getElementById(boxId);
     newDropzone.appendChild(box); // Append the box to the dropzone
   });

   // Add functionality to remove the drop zone in order to return the boxes
   const closeButton = newDropzone.querySelector('.close-btn');
   closeButton.addEventListener('click', () => {
     // Move all the boxes back to their original container
     const boxesInZone = newDropzone.querySelectorAll('.box');
     boxesInZone.forEach((box) => {
       originalPositions[box.id].appendChild(box); // Return to original position
     });
     dropzoneContainer.removeChild(newDropzone); // Remove the drop zone
     dropzoneCount--; // Decrease the count
   });
 };

 // Event listener for adding new drop zones
 addDropZoneButton.addEventListener('click', createDropZone);
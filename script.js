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



// Add dragstart event to each box to create a temporary copy
boxes.forEach((box) => {
  box.addEventListener("dragstart", (event) => {
    // Create a new temporary copy for dragging
    const newbox = box.cloneNode(true);
    newbox.id = ""; // Remove ID to avoid duplicates

    // Add styles to indicate it's a copy
    newbox.style.position = "absolute";
    newbox.style.opacity = "0.5";

    // Append the copy to the body to make it draggable
    document.body.appendChild(newbox);

    // Set the new copy as the drag image
    event.dataTransfer.setDragImage(newbox, 0, 0);

    // Remove the temporary copy after drag ends
    newbox.addEventListener("dragend", () => {
      newbox.remove();
    });

    // Set the original element's text as the data to identify it
    event.dataTransfer.setData("text/plain", box.innerText);
  });
});

// Allow drop zones to accept dropped copies
document.querySelectorAll(".dropzone").forEach((dropzone) => {
  dropzone.addEventListener("dragover", (event) => {
    event.preventDefault(); // Allow dropping
  });

  dropzone.addEventListener("drop", (event) => {
    event.preventDefault();

    // Get the text of the dragged box to know what was dropped
    const boxText = event.dataTransfer.getData("text/plain");

    // Find the original box with matching text to clone
    const originalbox = [...boxes].find(
      (box) => box.innerText === boxText
    );

    // Create a permanent copy of the dragged box
    const finalbox = originalbox.cloneNode(true);
    finalbox.id = ""; // Clear ID for uniqueness

    // Append the permanent copy to the drop zone
    dropzone.appendChild(finalbox);
  });
});
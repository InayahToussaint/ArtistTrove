// Function to get a random word from the list
function getRandomWord(wordList) {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

// Function to generate random words and display them
function generateRandomWords() {
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
}

// Add event listener to the button to generate random words
document.getElementById('generateButton').addEventListener('click', generateRandomWords);

// Get reference to the reset button
const resetButton = document.getElementById('resetButton');

// Add click event listener to the button to reset the page
resetButton.addEventListener('click', function() {
  location.reload();
});

const dropzoneContainer = document.getElementById('dropzoneContainer');
const addDropZoneButton = document.getElementById('addDropZone');
const boxes = document.querySelectorAll('.box');
const boxContainer = document.getElementById('boxContainer');
let dropzoneCount = 0;
const maxDropzones = 12;

// Drag start event for original boxes
boxes.forEach((box) => {
  box.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text', e.target.id);
  });
});

// Function to handle word generation when clicked in dropzone
const handleBoxClick = (e) => {
  // Ensure the box is in a dropzone and trigger word generation
  if (e.target.closest('.dropzone')) {
      generateRandomWords();
  }
};

// Add new drop zones 
const createDropZone = () => {
  if (dropzoneCount >= maxDropzones) {
      alert('You can only add up to 12 drop zones.');
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
      const originalBox = document.getElementById(boxId);

      // Create a clone of the box for the drop zone
      const boxClone = originalBox.cloneNode(true);
      boxClone.id = `${boxId}-clone-${Math.random().toString(36).substr(2, 9)}`; // Unique ID for the clone
      newDropzone.appendChild(boxClone);

      // Make the clone draggable
      boxClone.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text', boxClone.id);
      });

      // Add the click event listener to both the original box and the cloned box
      boxClone.addEventListener('click', handleBoxClick);
      originalBox.addEventListener('click', handleBoxClick);

      // Ensure original box works after being dropped
      originalBox.style.pointerEvents = 'auto'; // Re-enable pointer events if they were disabled
  });

  // Add functionality to remove the drop zone and return the boxes to their original container
  const closeButton = newDropzone.querySelector('.close-btn');
  closeButton.addEventListener('click', () => {
      // Remove the drop zone and all its contents
      dropzoneContainer.removeChild(newDropzone);
      dropzoneCount--; // Decrease the count
  });
};

// Event listener for adding new drop zones
addDropZoneButton.addEventListener('click', createDropZone);


function getRandomWord(wordList) {
  const randomIndex = Math.floor(Math.random() * wordList.length);
  return wordList[randomIndex];
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

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
let dropzoneCount = 0;
const maxDropzones = 12;

// Function to handle word generation when clicked in dropzone
const handleBoxClick = (e) => {
  if (e.target.closest('.dropzone')) {
    generateRandomWords();
  }
};

// Function to create a single drop zone
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
    boxClone.setAttribute('draggable', 'true');
    boxClone.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text', boxClone.id);
    });

    // Add the click event listener to both the original box and the cloned box
    boxClone.addEventListener('click', handleBoxClick);
    originalBox.addEventListener('click', handleBoxClick);
  });

  // Add functionality to remove the drop zone and return the boxes to their original container
  const closeButton = newDropzone.querySelector('.close-btn');
  closeButton.addEventListener('click', () => {
    // Close the individual drop zone
    dropzoneContainer.removeChild(newDropzone);
    dropzoneCount--; // Decrease the count
  });
};

// Function to generate multiple drop zones based on user input
const generateDropZones = () => {
  const numberOfDropZones = document.getElementById('dropzoneInput').value;
  
  // Validate input: Ensure the number is a valid number between 1 and maxDropzones
  if (numberOfDropZones && numberOfDropZones > 0 && numberOfDropZones <= maxDropzones) {
    // Clear current drop zones
    dropzoneContainer.innerHTML = '';
    dropzoneCount = 0;

    // Add the requested number of drop zones
    for (let i = 0; i < numberOfDropZones; i++) {
      createDropZone();
    }
  } else {
    alert('Please enter a number between 1 and 12.');
  }
};

// Event listener for generating drop zones
document.getElementById('generateDropZonesButton').addEventListener('click', generateDropZones);

// Make boxes draggable
const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
  box.setAttribute('draggable', 'true');
  box.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', box.id);
  });
});
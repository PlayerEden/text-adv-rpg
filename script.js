let storyData = {};
let currentNode = 'start';

// Fetch story data from external JSON file
fetch('story.json')
    .then(response => response.json())
    .then(data => {
        storyData = data;
        updateStory(); // Start the game after loading the data
    })
    .catch(error => console.error('Error loading story data:', error));

// Function to update the story and display choices
function updateStory() {
    const node = storyData[currentNode];
    if (!node) {
        document.getElementById('story-text').textContent = 'Error: Story node not found!';
        return;
    }

    document.getElementById('story-text').textContent = node.text;

    const buttonContainer = document.getElementById('button-container');
    buttonContainer.innerHTML = ''; // Clear existing buttons

    // Loop through the choices and dynamically create buttons
    for (let choiceText in node.choices) {
        const button = document.createElement('button');
        button.textContent = choiceText;
        button.onclick = () => {
            currentNode = node.choices[choiceText];  // Update current node based on choice
            updateStory();
        };
        buttonContainer.appendChild(button);
    }
}

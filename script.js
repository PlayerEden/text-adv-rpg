// Define your story and choices
const storyNodes = {
    start: {
        text: "You are standing at a crossroad. Do you want to go left or right?",
        choices: [
            { text: "Go Left", nextNode: 'leftPath' },
            { text: "Go Right", nextNode: 'rightPath' }
        ]
    },
    leftPath: {
        text: "You encounter a wild wolf! What do you do?",
        choices: [
            { text: "Fight the wolf", nextNode: 'fight' },
            { text: "Run away", nextNode: 'runAway' }
        ]
    },
    rightPath: {
        text: "You find a treasure chest! What do you do?",
        choices: [
            { text: "Open the chest", nextNode: 'treasure' },
            { text: "Leave it alone", nextNode: 'leave' }
        ]
    },
    fight: {
        text: "You bravely fought the wolf and won!",
        choices: [
            { text: "Restart", nextNode: 'start' }
        ]
    },
    runAway: {
        text: "You ran away safely.",
        choices: [
            { text: "Restart", nextNode: 'start' }
        ]
    },
    treasure: {
        text: "You found a rare gem! Congratulations!",
        choices: [
            { text: "Restart", nextNode: 'start' }
        ]
    },
    leave: {
        text: "You walked away from the treasure chest.",
        choices: [
            { text: "Restart", nextNode: 'start' }
        ]
    }
};

// Initialize the game
let currentNode = 'start';

// Update the story and choices based on the current node
function updateStory() {
    const node = storyNodes[currentNode];
    document.getElementById('story-text').textContent = node.text;
    
    const buttonContainer = document.getElementById('button-container');
    buttonContainer.innerHTML = ''; // Clear existing buttons
    
    node.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.onclick = () => {
            currentNode = choice.nextNode;
            updateStory();
        };
        buttonContainer.appendChild(button);
    });
}

// Start the game
updateStory();


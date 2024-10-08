let storyData = {};
let currentNode = 'start';
let inventory = [];  // Array to store player’s inventory
let actionLog = [];  // Array to store the action log

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

    // Display current story text
    document.getElementById('story-text').textContent = node.text;

    // Update the action log with current story text
    addActionToLog(node.text);

    const buttonContainer = document.getElementById('button-container');
    buttonContainer.innerHTML = ''; // Clear existing buttons

    // Loop through the choices and dynamically create buttons
    for (let choiceText in node.choices) {
        const button = document.createElement('button');
        button.textContent = choiceText;
        button.onclick = () => {
            currentNode = node.choices[choiceText];  // Update current node based on choice
            handleSpecialChoices(choiceText);        // Check if it's a special choice (e.g., collect item)
            updateStory();
        };
        buttonContainer.appendChild(button);
    }
}

// Function to handle special game logic like adding to inventory
function handleSpecialChoices(choiceText) {
    if (choiceText === "Open the chest") {
        addToInventory("Rare Gem");
    } else if (choiceText === "Fight the dragon") {
        addToInventory("Dragon's Sword");
    }
}

// Add item to the player's inventory and update the UI
function addToInventory(item) {
    inventory.push(item);
    updateInventoryUI();
    addActionToLog(`You received: ${item}`);
}

// Update the inventory UI
function updateInventoryUI() {
    const inventoryList = document.getElementById('inventory');
    inventoryList.innerHTML = '';  // Clear existing items

    inventory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        inventoryList.appendChild(li);
    });
}

// Add a new entry to the action log
function addActionToLog(actionText) {
    actionLog.push(actionText);
    const actionLogContainer = document.getElementById('action-log');
    
    // Create new log entry
    const logEntry = document.createElement('p');
    logEntry.textContent = actionText;
    
    // Append log entry to the log container
    actionLogContainer.appendChild(logEntry);
    
    // Scroll to the bottom of the log
    actionLogContainer.scrollTop = actionLogContainer.scrollHeight;
}

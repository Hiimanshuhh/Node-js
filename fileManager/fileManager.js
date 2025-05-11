// Importing the built-in 'fs' (File System) module to interact with files
const fs = require("fs");

// Path to the file where tasks will be saved
const filePath = "./tasks.json";

/**
 * Loads tasks from the JSON file
 * @returns {Array} - Returns an array of task objects
 */
const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath); // Read binary data from file
    const dataJSON = dataBuffer.toString();       // Convert buffer to string
    return JSON.parse(dataJSON);                  // Parse JSON to JavaScript object
  } catch (error) {
    return []; // If file not found or empty, return empty task list
  }
};

/**
 * Saves tasks to the JSON file
 * @param {Array} tasks - An array of task objects
 */
const saveTasks = (tasks) => {
  const dataJSON = JSON.stringify(tasks);         // Convert object to JSON string
  fs.writeFileSync(filePath, dataJSON);           // Write string to file
};

/**
 * Adds a new task
 * @param {string} task - Task description
 */
const addTask = (task) => {
  const tasks = loadTasks();                      // Load existing tasks
  tasks.push({ task });                           // Add new task as object
  saveTasks(tasks);                               // Save updated list
  console.log("✅ Task Added:", task);
};

/**
 * Lists all tasks
 */
const listTask = () => {
  const tasks = loadTasks();
  tasks.forEach((task, index) =>
    console.log(`${index + 1} - ${task.task}`)     // Print each task with number
  );
};

/**
 * Removes a task by index (1-based index from command line)
 * @param {number} index - Index of task to remove (1-based)
 */
const removeTask = (index) => {
  const tasks = loadTasks();

  if (index > 0 && index <= tasks.length) {
    tasks.splice(index - 1, 1);                    // Remove task at index-1 (zero-based)
    saveTasks(tasks);                              // Save updated task list
    console.log("🗑️ Task Deleted Successfully!");
  } else {
    console.log("❌ Invalid task index!");
  }
};

// Get command-line arguments: node app.js <command> <argument>
const command = process.argv[2];
const argument = process.argv[3];

// Command routing
if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTask();
} else if (command === "remove") {
  removeTask(parseInt(argument));
} else {
  console.log("❓ Command not found!");
}

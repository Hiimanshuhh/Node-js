// Import required modules
const fs = require("fs"); // Built-in module to work with the file system (reading/writing files)
const os = require("os"); // Built-in module to get operating system-related information
const EventEmitters = require("events"); // Built-in module to work with custom events

// Create a custom Logger class that extends EventEmitter
class Logger extends EventEmitters {
  // Custom log method that emits a "message" event with the message data
  log(message) {
    this.emit("message", { message });
  }
}

// Create an instance of the Logger class
const logger = new Logger();

// Define the file path where logs will be stored
const logFile = "./events.txt";

// Function to log event messages to a file
const logToFile = (event) => {
  // Format the log message with timestamp and message content
  const logMessage = `${new Date().toISOString()} - ${event.message} \n`;

  // Append the formatted message to the log file
  fs.appendFileSync(logFile, logMessage); // appendFileSync writes data to a file synchronously
};

// Listen for the "message" event and call logToFile function whenever it's emitted
logger.on("message", logToFile);

// Emit a log event every 3 seconds with current memory usage information
setInterval(() => {
  const memUsage = (os.freemem() / os.totalmem()) * 100; // Calculate free memory percentage
  logger.log(`Current memory Usage : ${memUsage}`); // Emit the memory usage log
}, 3000);

// Emit a log for application start
logger.log("Application Started");

// Emit a log for application end (note: this logs immediately; the app doesn't really end here)
logger.log("Application ended");

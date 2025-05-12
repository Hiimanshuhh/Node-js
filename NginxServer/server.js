// Import the 'fs' module for reading files from the file system
const fs = require("fs");

// Import the 'http' module to create an HTTP server
const http = require("http");

// Import the 'path' module to work with file and directory paths
const path = require("path");

// Define the port number where the server will listen
const port = 3000;

// Create the server
const server = http.createServer((req, res) => {
  
  // Get the requested file path.
  // If the request is just "/", then serve "index.html" by default.
  // Otherwise, use the requested URL (like "/about.html" or "/style.css").
  const filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

  // Get the file extension (like ".html", ".css", ".js") and convert it to lowercase
  const extName = String(path.extname(filePath)).toLowerCase();

  // Create a mapping of file extensions to their MIME (media type) types
  // This tells the browser how to handle each file type.
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png", // Corrected from "text/png" to "image/png"
  };

  // Set the appropriate content type based on the file extension
  // If it's not in our list, use a generic binary stream type
  const contentType = mimeTypes[extName] || "application/octet-stream";

  // Read the file from disk
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If there is an error (like file not found), send a 404 response
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("404 File Not Found!! BRooooooo"); // Funny custom 404 message
    } else {
      // If no error, send a 200 OK response with the appropriate content type
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8"); // Send the content of the file to the browser
    }
  });
});

// Start the server and listen on the defined port
server.listen(port, () => {
  console.log(`Port is Listening ${port}`);
});

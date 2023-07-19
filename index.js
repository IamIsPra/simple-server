// Import necessary modules
const fs = require("fs");
const fastify = require("fastify")({ logger: true });
const path = require("path");
const { promisify } = require('util');

// Import the fastify-cors plugin
const fastifyCors = require('fastify-cors');

// Register the fastify-cors plugin
fastify.register(fastifyCors, {
  origin: true, // This allows all origins to access your API
});

// Helper function to check if a file exists
const fileExists = async (filePath) => {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
};

// Route to respond with "hello: world" when the root URL is accessed
fastify.get("/", async (request, reply) => {
  reply.code(200).send("Simple Server is running.");
});

// Route to retrieve the contents of a JSON file based on the provided file name
fastify.get("/retrive/:fileName", async (request, reply) => {
  const { fileName } = request.params;
  const file = path.join(__dirname, `/files/${fileName}.json`);
  
  // Synchronously read the content of the JSON file
  const data = fs.readFileSync(file);
  
  // Parse the JSON data
  const assessment = JSON.parse(data);

  // Send the JSON data in the response with a 200 status code
  reply.code(200).send(assessment);
});

// Route to save request body to a JSON file with an incrementing count as the file name
fastify.post("/save/:fileName", async (request, reply) => {
  const { fileName } = request.params;
  const filePathWithoutExt = path.join(__dirname, `/files/${fileName}`);

  let count = 0;
  let filePath = `${filePathWithoutExt}.json`;

  // Get the full URL from the request
  const protocol = request.raw.socket.encrypted ? 'https' : 'http';
  const host = request.headers.host;
  const fullURL = `${protocol}://${host}`;

  // Increment count and update filePath if the file already exists
  while (await fileExists(filePath)) {
    count++;
    filePath = `${filePathWithoutExt}_${count}.json`;
  }

  try {
    // Use { flag: 'wx' } to create the file if not available and fail if it already exists
    await fs.promises.writeFile(filePath, JSON.stringify(request.body), { flag: 'wx' });

    // Respond with a success message
    reply.send({ message: "File saved successfully.", url: `${fullURL}/retrive/${path.basename(filePath, path.extname(filePath))}` });
  } catch (err) {
    // If there's an error during file writing, respond with an error message and log the error
    reply.code(500).send({ error: "Error saving the file." });
    console.log(err);
  }
});

// Function to start the server
const start = async () => {
  try {
    // Listen on port 39003 for incoming requests
    await fastify.listen({ port: 3000 });
  } catch (err) {
    // If there's an error starting the server, log the error and exit the process with an error code
    fastify.log.error(err);
    process.exit(1);
  }
};

// Call the start function to start the server
start();

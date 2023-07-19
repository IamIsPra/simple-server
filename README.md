# Simple Server - API Mocking Placeholder with Node.js and Fastify

Simple Server is a lightweight Node.js application built with Fastify, designed to serve as an API mocking placeholder. This application allows you to create and access JSON files that act as API endpoints for mocking GET and POST requests. It is a useful tool for development and testing scenarios where a live API is not available or desired.

## Getting Started

To get started with Simple Server, follow the steps below:

### Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (https://nodejs.org) - Ensure you have Node.js installed, as it is required to run the application.

### Installation

1. Clone the Simple Server repository from GitHub:

   ```bash
   git clone https://github.com/IamIsPra/simple-server.git
   cd simple-server
   ```

2. Install the required Node.js packages:

   ```bash
   npm install
   ```

### Running the Server

Start the Simple Server by executing the following command:

```bash
npm start
```

By default, the server will listen on port 3000 for incoming requests. You can change the port number in the `start` function in the `index.js` file if needed.

## Usage

### Mocking GET APIs

To mock a GET API, you can create a JSON file in the `files` directory. The JSON file's content will be served as the response when the corresponding endpoint is accessed.

To access the mocked data, use the following endpoint:

```
GET http://localhost:3000/retrieve/:fileName
```

Replace `:fileName` with the name of the JSON file (without the `.json` extension) you want to retrieve. For example:

```
GET http://localhost:3000/retrieve/sampleData
```

This will return the content of the `sampleData.json` file located in the `files` directory.

### Mocking POST APIs

To mock a POST API and save the response body, you can use the following endpoint:

```
POST http://localhost:3000/save/:fileName
```

Replace `:fileName` with the desired name for the JSON file to store the POST data. The server will save the POST request body as JSON in a file named `:fileName_timestamp.json`, where `timestamp` is the current timestamp at the moment of the request.

### Example

**POST request**:

```
POST http://localhost:3000/save/userData
Body: { "username": "john_doe", "age": 30, "email": "john@example.com" }
```

The server will create a JSON file named `userData_1626543814757.json` in the `files` directory with the content:

```json
{
  "username": "john_doe",
  "age": 30,
  "email": "john@example.com"
}
```

**GET request**:

```
GET http://localhost:3000/retrieve/userData_1626543814757
```

The server will respond with the content of the `userData_1626543814757.json` file.

## Contributing

Contributions to the Simple Server project are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.

## Acknowledgments

Special thanks to the Fastify community for providing an efficient and easy-to-use web framework for Node.js.

Happy API Mocking with Simple Server! 🚀
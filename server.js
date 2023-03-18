const express = require('express');
const { getData } = require('./database');
const app = express();

app.get('/data', async (req, res) => {
  console.log('GET /data');
  try {
    const data = await getData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving data from the database.');
  }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });

/*This code is a simple example of a web server using the Express.js framework. It listens on port 3000 and has two routes: / and /data. The first route responds with “Hello World!” when accessed. The second route retrieves data from a database using the getData function imported from the ./database module and sends it back to the client as JSON.

Here’s a brief explanation of each part of the code:

const express = require('express');: This line imports the Express.js module.
const { getData } = require('./database');: This line imports the getData function from the ./database module.
const app = express();: This line creates an instance of an Express.js application.
const port = 3000;: This line sets the port number that the server will listen on.
app.get('/', (req, res) => {...});: This block defines a route for handling GET requests to the root path (/) of the server. When this route is accessed, it sends back “Hello World!” as a response.
app.listen(port, () => {...});: This block starts up the server and makes it listen on port 3000. When it starts successfully, it logs a message to console indicating that it’s running and listening for incoming requests.
app.get('/data', async (req, res) => {...});: This block defines another route for handling GET requests to /data. When this route is accessed, it retrieves data from a database using the imported getData function and sends it back to client as JSON. */

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://ConsciousNetwork1:7mGSYt7Afj5X0FGa@cluster0.p1boera.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);


async function getData() {
    try {
        await client.connect();
        const database = client.db('UserData');
        const collection = database.collection('googleauthusers');

        // Find all documents in the collection
        const data = await collection.find({}).toArray();
        console.log('getData called');
        return data;
    } finally {
        await client.close();
    }
}

module.exports = { getData };

/* This code defines a getData function that retrieves data from a MongoDB database. It uses the mongodb module to connect to a MongoDB server and retrieve data from the planets collection in the sample_guides database.

Here’s a brief explanation of each part of the code:

const { MongoClient } = require('mongodb');: This line imports the MongoClient class from the mongodb module.
const uri = "mongodb+srv://...";: This line defines the connection string for connecting to a MongoDB server. The connection string contains information such as the server address and authentication credentials.
const client = new MongoClient(uri);: This line creates an instance of a MongoDB client using the connection string defined earlier.
async function getData() {...}: This block defines an asynchronous function named getData. When called, this function connects to the MongoDB server using the client instance created earlier, retrieves data from the specified collection in the specified database and returns it as an array of documents.
Inside this function:
await client.connect();: This line connects to the MongoDB server using the client instance.
const database = client.db('sample_guides');: This line gets a reference to the specified database (sample_guides) on the connected server.
const collection = database.collection('planets');: This line gets a reference to the specified collection (planets) in the specified database.
const data = await collection.find({}).toArray();: This line retrieves all documents from this collection and converts them into an array. The empty object {} passed as argument to .find() means that no filter is applied and all documents are returned.
Finally, this code exports an object containing only one property: { getData }. The value of this property is a reference to our previously defined getData function. By exporting it like this we make it available for other modules (like our Express.js app) to import and use.

knowledge :
await is a keyword used in asynchronous functions to pause the execution of the function until a Promise is resolved. It can only be used inside an async function.
In JavaScript, a Promise represents an eventual value that may not be available yet. For example, when you make a network request or query a database, the result may not be immediately available. Instead of blocking the execution of your code until the result is ready (which would make your program unresponsive), you can use Promises to handle these asynchronous operations.
When you await a Promise, the execution of the current function is paused until the Promise is resolved (i.e., its result becomes available). Once the Promise is resolved, its result is returned as the value of the await expression and execution continues from where it left off.



*/
// seed.js
const mongoose = require('mongoose');
const fs = require('fs'); // File system module to read JSON
const path = require('path');



// Path to the JSON file (adjusting for different folder)
const jsonDataPath = path.join(__dirname, 'data', 'trips.json'); // Assuming 'data' is the folder



// Read the JSON data from the file
const reefs = JSON.parse(fs.readFileSync('./data/trips.json', 'utf-8'));

console.log('Reefs data:', reefs); // Log to ensure it is an array



if (!Array.isArray(reefs)) {
console.error("Error: Data is not an array!");
process.exit(1); // Exit if the data is not an array
}

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/travlr', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log("Connected to MongoDB");



// Access the 'reefs' collection directly
const db = mongoose.connection.db;
const collection = db.collection('trips'); // Specify the collection name



// Insert the seed data directly into the collection
return collection.insertMany(reefs);
})
.then(() => {
console.log("Data has been seeded successfully!");
})
.catch(err => {
console.error("Error seeding data:", err);
})
.finally(() => {
mongoose.connection.close();
});
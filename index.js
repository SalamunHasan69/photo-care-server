const express = require('express');
const cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());




var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-aszh8hu-shard-00-00.3kn3bwn.mongodb.net:27017,ac-aszh8hu-shard-00-01.3kn3bwn.mongodb.net:27017,ac-aszh8hu-shard-00-02.3kn3bwn.mongodb.net:27017/?ssl=true&replicaSet=atlas-yt8a18-shard-0&authSource=admin&retryWrites=true&w=majority`;
console.log(uri);
MongoClient.connect(uri, function (err, client) {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



app.get('/', (req, res) => {
  res.send('Photo Care Server is Running')
});

app.listen(port, () => {
  console.log(`Photo care server running on ${port}`);
});
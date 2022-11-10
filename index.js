const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());




var uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ac-aszh8hu-shard-00-00.3kn3bwn.mongodb.net:27017,ac-aszh8hu-shard-00-01.3kn3bwn.mongodb.net:27017,ac-aszh8hu-shard-00-02.3kn3bwn.mongodb.net:27017/?ssl=true&replicaSet=atlas-yt8a18-shard-0&authSource=admin&retryWrites=true&w=majority`;
MongoClient.connect(uri, function (err, client) {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  try {
    const serviceCollection = client.db('photoCare').collection('services');
    const reviewCollection = client.db('photoCare').collection('reviews');

    app.get('/services', async (req, res) => {
      const query = {}
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });

    app.post('/myReviews', async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review);
      res.send(result);
    });

    app.get('/myReviews', async (req, res) => {
      let query = {};
      if (req.query.email) {
        query = {
          email: req.query.email
        }
      }
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    })

  }

  finally {

  }
});

async function run() {

}
run().catch(error => console.error(error));

app.get('/', (req, res) => {
  res.send('Photo Care Server is Running')
});

app.listen(port, () => {
  console.log(`Photo care server running on ${port}`);
});
const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const ObjectId = require("mongodb").ObjectId;
//middleware 
app.use(cors());
app.use(express.json());

//db
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zpne0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("Holiday");
      const tour_place_collection = database.collection("tour_place");
      const Booking_info_collection=database.collection("Booking_info");
    
      //get all api
      app.get("/tours", async (req, res) => {
          const result = await tour_place_collection.find({}).toArray();
          res.send(result);
      })
//get one tour_place 
      app.get('/tourLocation/:id', async (req, res) => {
          const id = req.params.id;
          const query = { _id: ObjectId(id) };
          const result = await tour_place_collection.findOne(query);
          console.log(result);
          res.send(result);
      })
//post on data 
      app.post('/bookingInfo', async (req, res) => {
          console.log(req.body);
          const result = await Booking_info_collection.insertOne(req.body);
          console.log(result);
          res.json(result)
      })

//get booking api
      app.get('/bookingInfo/:email', async (req, res) => {
          const email = req.params.email;
        //   console.log(email);
          const query = { email: email };
          const result = await Booking_info_collection.find(query).toArray();
        // console.log(result);

          res.send(result)
      })

//get all booking 
      app.get('/bookingInfo', async (req, res) => {
           const result = await tour_place_collection.find({}).toArray();
           res.send(result);
      })



      
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);












app.get("/", (req, res) => {
  res.send("Holiday is on !");
});

app.listen(port, () => {
  console.log("listening on port",port);
});

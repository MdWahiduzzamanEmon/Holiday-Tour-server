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

async function run() {
  try {
    await client.connect();
    const database = client.db("Holiday");
    const tour_place_collection = database.collection("tour_place");
    const Booking_info_collection = database.collection("Booking_info");
    const Message_collection = database.collection("Message");
    const comment_collection = database.collection("comment");

    //get all api
    app.get("/tours", async (req, res) => {
      const result = await tour_place_collection.find({}).toArray();
      res.send(result);
    });
    //delete data 
    app.delete("/dataDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await tour_place_collection.deleteOne(query);
      res.json(result)
    })
    //post in all api
    app.post("/destination", async (req, res) => {
      const doc = req.body;
      const result = await tour_place_collection.insertOne(doc);
      res.json(result);
    });
    //get one tour_place
    app.get("/tourLocation/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await tour_place_collection.findOne(query);
      res.send(result);
    });
    //post on data
    app.post("/bookingInfo", async (req, res) => {
      const result = await Booking_info_collection.insertOne(req.body);
      res.json(result);
    });
    //post  message
    app.post("/message", async (req, res) => {
      const result = await Message_collection.insertOne(req.body);
      res.json(result);
    });
    //post  comment
    app.post("/comment", async (req, res) => {
      const result = await comment_collection.insertOne(req.body);
      res.json(result);
    });
    //get comment
    app.get('/comments', async (req, res) => {
      const result = await comment_collection.find({}).toArray();
      res.json(result)
    })

    //get booking api
    app.get("/bookingInfo/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await Booking_info_collection.find(query).toArray();
      res.send(result);
    });

    //get all booking
    app.get("/bookingInfo", async (req, res) => {
      const result = await Booking_info_collection.find({}).toArray();
      res.send(result);
    });

    //delete booking
    app.delete("/bookingDelete/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await Booking_info_collection.deleteOne(query);
      res.json(result);
    });
    //update status  api
    app.put("/status/:id", async (req, res) => {
      const id = req.params.id;
      const update = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          status: update.status,
        },
      };
      const result = await Booking_info_collection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.json(result);
    });
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

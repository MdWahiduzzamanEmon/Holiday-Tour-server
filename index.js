const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
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
    
      //get all api
      app.get("/tours", async (req, res) => {
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

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");



const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);


async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("assignment-8");
   const productCollection = db.collection('Products')
   const categoryCollection = db.collection("Categories")
   
     // get category 
     app.get('/api/categories', async (req, res) =>{
      try {
        const result = await categoryCollection.find().toArray();

        if (result) {
          res.status(200).json({
            success: true,
            message: "Category retrieved successfully",
            data: result,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "No Categories found",
            data: [],
          });
        }
      } catch (error) {
     console.log(error)
        res.status(500).json({
          success: false,
          message: "Something went wrong!",
        });
      }
    });

     // flash sale
     app.get('/api/flash-sale', async (req, res) =>{
      try {
        const result = await productCollection.find({flashSale: true}).sort({ratings: -1}).toArray();

        if (result) {
          res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: result,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "No products found",
            data: [],
          });
        }
      } catch (error) {
     console.log(error)
        res.status(500).json({
          success: false,
          message: "Something went wrong!",
        });
      }
    });
     // most popular products
     app.get('/api/most-popular', async (req, res) =>{
      try {
        const result = await productCollection.find().sort({ratings: -1}).toArray();

        if (result) {
          res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: result,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "No products found",
            data: [],
          });
        }
      } catch (error) {
     console.log(error)
        res.status(500).json({
          success: false,
          message: "Something went wrong!",
        });
      }
    });
   
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } finally {
  }
}

run().catch(console.dir);

// Test route
app.get("/", (req, res) => {
  const serverStatus = {
    message: "Server is running smoothly",
    timestamp: new Date(),
  };
  res.json(serverStatus);
});

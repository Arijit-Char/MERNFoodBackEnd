//jshint esversion:6
const mongoose = require("mongoose");
require("dotenv").config();
const mongoDB = async () => {
  await mongoose
    .connect(
     process.env.MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(async (result) => {
      console.log("connected");
      const fetched_data = await mongoose.connection.db.collection("foodData");

      fetched_data
        .find({})
        .toArray()
        .then(async (data) => {
          const food_Category = await mongoose.connection.db.collection("foodCategory");

          food_Category
            .find({})
            .toArray()
            .then((catData) => {
           

           global.foodData = data;
           global.foodCategory = catData;


            })
            .catch((err) => {
              console.log(err);
            });

          
          // console.log( global.foodData );
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(mongoose.version);
      console.log("Unable to connect to MongoDB. Error: " + err);
    });
};

module.exports = mongoDB;

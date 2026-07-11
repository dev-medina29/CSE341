const express = require("express");
const app = express();
const port = 2909;

const mongodb = require("./data/database");

app.use("/", require("./routes"));

mongodb.initdb((err) => {
  if (err) {
    console.log("There is an error connecting to the database",err);
  } else {
    app.listen(port, () => {
      console.log(`The app is running at localhost:${port}`);
    });
  }
});

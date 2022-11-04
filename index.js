const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const fs = require('fs')

const app = express();

app.use(json());

app.use("/api/v1/flight", routes);

app.get('/api/v1/flight', (req, res)=>{
  fs.readFile('./models/flight.json', 'utf8', (err, flight)=>{
    if (err) throw err
      res.status(201).json({
      success: true,
      Message: "flight fetched successfully",
      Flight_Details: JSON.parse(flight)
  })
  console.log(data)
    })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
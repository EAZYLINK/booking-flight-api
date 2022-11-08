const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const cuid = require('cuid')
const fs = require('fs')

const app = express();

app.use(json());

// Book flight
app.post('/api/v1/flight/book', (req, res) => {
  const {title, price, time, date} = req.body
  if (!title || !price || !time || !date)
  res.status(400).json("Fill all the required field");  

      const oldFlights = getFlightData();
      flightId = cuid.slug();
      const flightData = {flightId, title, price, time, date}
      const flightExist = oldFlights.find(flight => flight.time === time);
      if(flightExist)
      res.status(409).send("Flight already exists!")
        oldFlights.push(flightData);
        saveFlightData(oldFlights)
          res.status(201).json({
            success: true,
            Message: "Your account has been created successfully",
            Flight_Details: flightData
          });
})

//Get all flight
app.get("/api/v1/flight/fetch", (req, res) => {
  const flights = getFlightData();
  res.status(200).json({
    success: true,
    Message: "Flights fetched successfully",
    Flights: flights
  })
});

//Get single flight by time
app.get('/api/v1/flight/fetch/:id', (req, res) => {
  const id = req.params.id
  if(!id) 
  {
   return res.status(400).json("Please supply flight time");

  }
  const  flight = getFlightData();
  const findFlight = flight.find(data => data.flightId === id)
  if(!findFlight)
  return res.status(404).json("Requested flight does not exist!");
  res.status(200).json({
    success: true,
    Message: "Flight fetched successfully",
    Flight_Details: findFlight
  })
})

//Update flight by time
app.put('/api/v1/flight/update/:id', (req, res) => {
  const id = req.params.id;
  if(!id)
  return res.status(400).json("Please supply flight time");

  const flightData = req.body;
  flightData["flightId"] = id;
  const oldFlights = getFlightData();
  const findFlight = oldFlights.find(flight => flight.flightId === id);
  if(!findFlight)
   return res.status(404).send("flight does not exist!");
 const updateFlight = oldFlights.filter(flight => flight.flightId !== id);
 updateFlight.push(flightData);
 saveFlightData(updateFlight);
 res.status(200).json({
   success: true,
   message: "Flight updated successfully"
 })
})

//Delete flight by time
app.delete('/api/v1/flight/delete/:id', (req, res) => {
  const id = req.params.id;
  if(!id)
  return res.status(400).json("Please supply flight ID");

  const oldFlights = getFlightData();
  const filterFlight = oldFlights.filter(flight => flight.flightId !== id);
  if(oldFlights.length === filterFlight.length)
  return res.status(409).send("time does not exist!");
  saveFlightData(filterFlight);
  res.status(200).json({
    success: true,
    message: "Flight deleted successfully!"
  })
})

 // get flight data from json file
 const getFlightData = () => {
  const jsonData = fs.readFileSync('./models/flight.json');
  return JSON.parse(jsonData);
}

//save flight data to json file
const saveFlightData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync('./models/flight.json', stringifyData);
}



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
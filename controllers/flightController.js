const fs = require('fs')

// exports.example = (req, res) => {
//     console.log("example")
//     res.send("Flight example")
// }
exports.bookFlight = (req, res) => {
    const {title, price, time, date} = req.body
  if (!title || !price || !time || !date)
  res.status(400).json("Fill all the required field");  

     const flight = fs.readFileSync("./models/flight.json");

        var flightToJson = JSON.parse(flight);
        console.log(flightToJson)
        const data = {title, price, time, date}
        flightToJson.push(data)
        const newFlght = JSON.stringify(flightToJson);

        fs.writeFile("./models/flight.json", newFlght, (err) => {
          if (err) {
            res.status(500).json(err);
            return;
          }
          res.status(201).json("Your account has been created successfully");
        });
  };
  
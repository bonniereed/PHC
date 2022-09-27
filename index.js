//importing dependencies
const express = require("express");
const app = express();
const PORT = 3001;
const { default: axios } = require("axios");
const apiUrlLots = "https://parking.api.smgov.net/lots";
const apiUrlMeters = "https://parking.api.smgov.net/meters";
const { geo2zip } = require("geo2zip");
//config for request header
const config = [{ method: "GET", headers: { Accept: "application/json" } }];
//returned lot info will push to this array
let lotArr = [];
//returned meter info will push to this array
let meterArr = [];
//server listening on port 3001
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
//retrieving lot info
axios.get(apiUrlLots, [config]).then((response) => {
  const returnedSpaces = response.data;
  //pushing data to lot array for later use
  returnedSpaces.forEach((returnedSpace) => {
    lotArr.push({
      available_spaces: returnedSpace.available_spaces,
      name: returnedSpace.name,
      street_address: returnedSpace.street_address,
      zip_code: returnedSpace.zip_code,
    });
  });
});
//retrieving meter info
axios.get(apiUrlMeters, [config]).then((response) => {
  const returnedMeters = response.data;
  //pushing to meter array for later use
  returnedMeters.forEach((returnedMeter) => {
    meterArr.push({
      active: returnedMeter.active,
      meter_id: returnedMeter.meter_id,
      latitude: returnedMeter.latitude,
      longitude: returnedMeter.longitude,
    });
  });
});

//returning direction for user
app.get("/", async (req, res) => {
  res.json("Please navigate to localhost:3001/api/(yourZipCodeHere)");
});
//returning lots by zip and meters by zip
app.get("/api/:zip_code", async (req, res) => {
  try {
    let zipRequest = req.params.zip_code;
    let meterZipArr = [];
    newArr = await meterArr.map(async (meter) => {
      let zipResponse = await geo2zip({
        latitude: meter.latitude,
        longitude: meter.longitude,
      });
      if (zipResponse == zipRequest) {
        meterZipArr.push(meter);
      }
    });
    let lotZipArr = lotArr.filter((lot) => lot.zip_code == zipRequest);
    const responseData = {
      [zipRequest]: {
        lots: lotZipArr,
        meters: meterZipArr,
      },
    };
    res.json(responseData);
  } catch (error) {
    res.json(`Error occurred: ${error}`);
  }
});

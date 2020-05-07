const express = require("express");
const app = express();
const axios = require('axios');
const parseString = require('xml2js').parseString;
const cors = require('cors')
const PORT = 5000

// Allowing all CORS request
app.use(cors())

// Converting function into an async function to handle the different api's requests
app.get('/', async function (req, res) {
  const { name } = req.query
  let iTunesResponse = {}
  let tVMazeResponse = {}
  let crcindResponse = {}
  
  // Making call to itunes api
  await axios.get(`https://itunes.apple.com/search?term=${name}`)
  .then(async function (response) {
    // handle success
    iTunesResponse = await response.data.results
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  // Making call to tvmaze api
  await axios.get(`http://api.tvmaze.com/search/shows?q=${name}`)
  .then(async function (response) {
    // handle success
    tVMazeResponse = await response.data
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  // Making call to crcind api
  await axios.get(`http://www.crcind.com/csp/samples/SOAP.Demo.cls?soap_method=GetByName&name=${name}`)
  .then(async function (response) {
    // handle success
    // Converting XML into JSON to work with it
    await parseString(response.data, function (err, result) {
      // Getting into list we need
      crcindResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0].GetByNameResponse[0].GetByNameResult[0]['diffgr:diffgram'][0].ListByName[0]['SQL']
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  // Sending response separating data depending on their source
  await res.send(
    {
      itunes: iTunesResponse,
      tvMaze: tVMazeResponse,
      crcind: crcindResponse
    }
  );
});

app.listen(PORT, () => {
 console.log("Server running on port " + PORT);
});
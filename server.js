// Setup empty JS object to act as endpoint for all routes
projectData = {};
 // TODO: Require Express to run server and routes
const express = require('express');
 // TODO: Start up an instance of app
const app = express();
 /** Dependencies */
 // TODO: Require body-parser allow us to parse the data we eventually will be passing through routes on our server.
const bodyparser = require('body-parser');
 //Here we are configuring express to use body-parser as middle-ware.
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
 //TODO: Require cors allows for communication across the web
const cors = require('cors');
 // Cors for cross origin allowance
app.use(cors());
 // TODO: Initialize the main project folder
app.use(express.static('website'));

 /** creat local Server */
 // TODO: set variable to port
const port = 8000;
 // Callback function for debugging
const server = app.listen(port,listening);
function listening(){
    console.log('server is working');
    console.log(`running localhost :${port}`);
};

/** Initialize get and post routes with their own a callback function for server*/
 // TODO: creat get route for responding to client-side's GET request to send data in  javascript object (projectData)in server to browser
app.get('/all', sendData);
function sendData (request, response) {
    response.send(projectData);
    console.log(projectData);
};

 //TODO: creat Post route for clint-side's POST request to store data in empty javascript object (projectData)in server
app.post('/addWeather', addWeather);
function addWeather (req, res){
   // TODO: Console to see and be sure d ata are posted from client-side
    console.log(req.body)
    newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    }
     // TODO: extract data from arrays and objects into distinct variables using destructuring
    let {temp, date, content} = newEntry;
    // TODO: Store data in projectData (endpoint storage of server)
    projectData.newEntry = newEntry ;
    res.send(projectData);
    console.log(projectData);
};

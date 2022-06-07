/* Global Variables */
// TODO: Creat variable for URL address which is used with api key to obtain data about weather by using zip code of city or country
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// TODO: My API key used for asking openweathermap information about weather
const apiKey = '&appid=884ed9e96c4d9e55590b94c8f722e853&units=imperial';
// TODO: Add click event listener for button element with the id: generate  and callback function actio that will be occured when click on button
document.getElementById('generate').addEventListener('click', action);
// TODO: Declare action function when click event is occured
function action(){
// TODO: Set variable for zip code of user in selected HTML element
    let zipCode = document.getElementById('zip').value;
// TODO: Set variable for value of How does user feel in selected HTML element
    let content = document.getElementById('feelings').value;
// TODO: Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
// TODO: ReCall  async function with 3 parameters for making GET request to get Data from API
    getWeather(baseUrl, zipCode, apiKey)
// TODO: Chaining promises after GET request by getWeather async function with .then() which allows us to make multiple dependent HTTP requests
    .then(function(data){
        console.log(data);
  // TODO: Add data to post route
        postData('/addWeather', { temp: data.main.temp, content: content, date: newDate})
  // TODO: another chaining promise after recall postData function to make GET request to data stored in javascript object endpoint
        .then(retrieveData())
        })
}

/** GET request to API*/
// Async function for GET request for API of openweathermap
/** declare async functiom in which fetch function to make GET request*/
const getWeather = async (baseUrl, zip, key)=>{
    const res = await fetch(baseUrl+zip+key);
    try {
  // TODO: try that if API responds
        const data = await res.json();
        console.log(data);
        return data;
    }
  // TODO: catch error if there is error in try block and catch it
    catch (error) {
        console.log('error', error);
    }
}

/** POST request to localhost server */
//Async function for POST request with 2 paramters URL and data that will be stored in javascript object in server
const postData = async ( url ='', data = {})=>{
// TODO: make a fetch call inside async function to make POST request
    const response = await fetch(url,{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        //body data type match 'content-type' of headers and making data string
        body: JSON.stringify(data),
    });

    try {
  //convert data into javascript object
        const data = await response.json();
        return data;
        console.log(data);
    }catch(error) {
  // TODO: handle by catch and defined it
        console.log('error', error);
    }
}


/** POST request to server
* async function toGET project Data */
//TODO: send GET request to server to obtain on stored data in javascript object in server by using fetch function inside async function with keywords(await,try and catch)
const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
 // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.newEntry.temp)}degrees`;
        document.getElementById('content').innerHTML = `feel: ${allData.newEntry.content}`;
        document.getElementById('date').innerHTML =`Today: ${allData.newEntry.date}`;
    }
    catch(error) {
        console.log('error', error);
   // appropriately handle the error
    }
}

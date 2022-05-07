/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = "14c1beafe1fe4d4a2545857c571caf61&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Getting Generate button
let generate = document.getElementById("generate");

//Function to fetch data from the weather api using zip code
const getWeather = async (key) => {
  
  let zipCode = document.getElementById("zip").value;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${key}`
  );
  try {
    weatherData = await res.json();
    return weatherData.main.temp;
  } catch (error) {
    console.error("Error : ", error);
  }
};

//Function to update the UI
const updateUI = async ()=>{
  const res = await fetch('/all');
  try{
    projectData = await res.json();
    document.getElementById('date').innerText = 'Date : '+projectData.date;
    document.getElementById('temp').innerText = 'Temperature : '+projectData.temp;
    document.getElementById('content').innerText = 'Your Feeling : '+projectData.content;
  }catch(error){
    console.error('Error : ',error)
  }
} 

//function to post data
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });
    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.error("error", error);
    }
}

// listen on Generate Button
generate.addEventListener("click", ()=>{
  let feelings = document.getElementById("feelings").value;

  getWeather(apiKey)
  .then(function(data){
    postData('/add',{date:newDate, temp:data, content:feelings})
    .then(updateUI());
  })
});
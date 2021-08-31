const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res) {

  const city = req.body.cityName;

  var url = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=6f39cd43ac41ec46af8476530313320e&units=metric";
  https.get(url, function(response) {
    console.log(response.statusCode);
  response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.list[0].main.temp;
      const weatherDescription = weatherData.list[0].weather[0].description;
      const icon = weatherData.list[0].weather[0].icon;
      const imgurl = "http://openweathermap.org/img/wn/" + icon +"@2x.png"


      res.write("<h1>temperatura u "+city+ " je " + temp + "</h1>");
      res.write("<p>weater description is " + weatherDescription + "</p>");
      res.write("<img src="+imgurl+">");

      res.send();


    });
  });

});




app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});

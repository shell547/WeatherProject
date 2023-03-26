
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extented:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req, res){
   
    const city=req.body.cityName;
const apiKey="1132191c42bdaab66f7ebab48dd46bfa";
const units="metric";

const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+units;
https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const description=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const imageURL= "https://openweathermap.org/img/wn/" + icon+ "@2x.png";
        console.log(temp);
        console.log(description);
        res.write("<p1>the weather is currently "+ description + " </p1>")
        res.write("<h1>The temperature in "+city+" is " + temp +" degrees celcius</h1>");
        res.write("<img src="+ imageURL+">");
        res.send();
    })
});
   
});



app.listen(3000, function(){
    console.log("server is running at 3000.");
});
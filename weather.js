const express = require("express");
const https=require("https");
const bodyParser = require("body-parser"); 
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const city = req.body.cityInput;
    const apikey="791edb0b134dba8b54ed6266768785ca";
   const url = https.get("https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid="+ apikey);
   https.get(url,function(response){
    response.on("data",function(data){
        const weatherdata = JSON.parse(data);   
        const temp=weatherdata.main.temp;
        res.render("resp",{Temp:temp , City:city});
    })
   })
})
   

app.listen("3000",function(){
    console.log("server port-3000 is up and running");
})
const express=require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");
const port=process.env.PORT||3000;
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function (req,res){

res.sendFile(__dirname+"/index.html");

})

app.post("/",function (req,res){
const query=req.body.cityName;

 const apiKey="50d9c636bfd869d37bb92fd8ae221987";

const units="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
https.get(url,function (response){

console.log(response.statusCode);
if(response.statusCode!=404)
{
response.on("data",function (data){
const weatherdata=JSON.parse(data);
const temperature=weatherdata.main.temp;
const weatherDescription=weatherdata.weather[0].description;
const imgid=weatherdata.weather[0].icon;
const imgurl="http://openweathermap.org/img/wn/"+imgid+"@2x.png";

res.write("<p>The weather condition currently is :"+weatherDescription+".</p>");
res.write("<h1>The temperature in "+query+" is currently "+temperature+" degree celcius.</h1>");
res.write("<img src="+imgurl+">");
res.send();
})
}
else
{


res.sendFile(__dirname+"/404.jpg");



}
}
)
}
)




let server=app.listen(port,function (){


console.log("hehe");


})
server.on('clientError', (err, socket) => {
  console.error(err);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
const express=require('express')
const app=express()
const https=require('https')
const bodyParser=require('body-parser')


app.use(bodyParser.urlencoded({extended:true}))
app.get('/',(req,res)=>{
      res.sendFile(__dirname+"/index.html")
})

app.post('/',(req,res)=>{
    const query=req.body.cityname
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=d6bbc6f50496ca4457d7f8221552bcea&units=metric"
    https.get(url,(response)=>{
        response.on("data",(data)=>{
          const weather=JSON.parse(data)
            const temp=weather.main.temp 
            const weatherdes=weather.weather[0].description
            const icon=weather.weather[0].icon
            const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>the temp of "+query+" " +"is"+" "+temp+"</h1>")
            res.write(weatherdes)
            res.write("<img src="+imageurl+" />")
            // Note we cannot have more than one res.send in one app.get 
            res.send() 
        })
    })
})

app.listen(5000,()=>{
    console.log("i am listening")
})
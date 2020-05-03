const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const publicDirPath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials') 

app.set('view engine','hbs')
app.set('views',viewpath)
app.use(express.static(publicDirPath))
hbs.registerPartials(partialspath)

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',    
        name:'Charan'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        name:'Charan'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help page',
        name:'Charan'
    })
})


app.get('',(req,res)=>{
     res.send('Hello Express !')
})
app.get('/help',(req,res)=>{
    res.send('<h1> ITS ABOUT PAGE </h1>')
})


app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
       return  res.send({
       error: 'You must provide a search query'
       })
    }


    geocode(req.query.address,(error,{latitude,longtitude,location} = {})=>{
        if(error)
        {
            return res.send({ error })
        }
        forecast(latitude,longtitude,(error, forecastdata) => {
        if(error)
        {
            return res.send({ error })
        }
        return res.send({ 
               forecast: forecastdata.temperature,
               location,
               address: req.query.address
        })
       })
   })


    // res.send({
    //             temperature : '35 degree',
    //             location : 'Hyderabad' ,
    //             address : req.query.address
    // }
    // )


})

app.get('/products',(req,res)=>{
   
    if(!req.query.search)
    {
       return  res.send({
       error: 'You must provide a search time'
       })
    }
    console.log(req.query.search)
    res.send({
        products: [ ]
    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 page',
        name: 'charan',
        errorMessage: 'Page not found'
    })
})

app.listen(port,() => {
    console.log('Server is up on port ' + port)
})
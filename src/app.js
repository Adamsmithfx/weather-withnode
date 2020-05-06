const path = require('path')
const express = require('express')
const hbs = require('hbs')
//const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDir))
app.get('', (req, res) => {
    res.render('index',{
        title:'Weather App',
        name:' Hill Berry'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help',
        name:' Hill Berry'        
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About',
        name:' Hill Berry'        
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
        res.send({
            location,
            forecast:forecastData,
            address:req.query.address
            
            })
        })
    })

})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'Must Provide a Search Term'
        })
    }
    console.log(req.query.search)    
    res.send({
        products:[]
    })
})

app.get( '*',(req,res)=>{
    res.render('404page',{
        title:'404 Not Found',
        name:'Hill Berry',
        errorMessage:' Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})

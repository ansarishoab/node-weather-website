const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('',(req,res) => {
  res.render('index',{
    title:'Weather App',
    name: 'Mohammed Shoab'
  })
})

app.get('/about',(req,res) => {
  res.render('about',{
    title: 'About me',
    name: 'Mohammed Shoab'
  })
})
app.get('/weather',(req,res) => {
  if(!req.query.address){
    return res.send({
      error:'Please enter valid address!'
    })
  }
  geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
    if(error){
      return res.send({
        error: error
      })
    }
  
    forecast(latitude,longitude,(error,forecastData) => {
      if(error){
        return res.send({
          error: error
        })
      }
      res.send({
        location: location,
        address: req.query.address,
        forecast: forecastData
      })
    })
  
  })
})

app.get('/product',(req,res) => {
  if(!req.query.search){
    return res.send({
      error:'Please provide valid search term!'
    })
  }
  res.send({
    product:[]
  })
})

app.get('/help',(req,res) => {
  res.render('help',{
    title:'Help',
    name: 'Mohammed Shoab'
  })
})

app.get('/help/*',(req,res) => {
  res.render('404',{
    title:'404',
    name : 'Mohammed Shoab',
    errorMessage: 'Help article not found'
  })
})

app.get('*',(req,res) => {
  res.render('404',{
  title:'404',
  name : 'Mohammed Shoab',
  errorMessage: 'Page not found'
  })
})



app.listen(3000,() => {
  console.log('Server is up on port 3000')
})
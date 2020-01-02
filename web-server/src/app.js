const forecast = require('./util/forecast');
const geocode = require('./util/geocode');


const path =  require('path')

const express = require('express')

const hbs = require('hbs')

console.log(path.join(__dirname, '../public'))
const app = express();

//path for epress config
const viewsPath = path.join(__dirname, '../templates/views')

const partialPath = path.join(__dirname, '../templates/partials')

//set up handle bars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) =>{
     res.render("index", {
         title: 'Weather Forecast',
         name: 'Luv Ralh'
     })
//     res.send('Hello Express your self!')
 })
 app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Please peovide an address'
        })
    }

    geocode(req.query.address, (error, data)=>{
        if(error){
            return res.send({
                error: error
            })
        
        }
        forecast(data.latitude, data.longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                        error
                })

            }          
            res.send({
                    title: 'Weather Page',
                    coordinates: data,
                    data: forecastdata,
                    data: forecastdata,
                    address: req.query.address
            
                })
            });
    })
    
})



app.get('/help', (req, res) =>{
 
    // res.send('<h1>Help is on its way!</h1>')
    res.render("help", {
        title: 'Help',
        helpText: 'Please contact at preetralh07@gmail.com'
    })
})

app.get('/help/*', (req, res) =>{
 
 //res.send('<h1>Help not found</h1>')
    res.render("error", {
        error: 'Help not found',
       
    })
})

app.get('/about', (req, res) =>{
    //res.send('About Page')
    res.render("about", {
        title: 'About Author',
        name: 'Luv Ralh'
    })
})
app.get('*', (req, res) =>{
    res.render("error", {
        error: 'Page not found',
        name: 'Luv Ralh'
    })
})




app.listen(3000, () => {
    console.log('Server is up on 3000')
})
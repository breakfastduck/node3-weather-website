const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Liam Baugh'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Liam Baugh'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Liam Baugh',
        helpText: 'Welcome to Help'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    const command = req.query.address;

    geoCode(command, (error, { location, latitude, longitude } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, { weather } = {}) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                location: location,
                forecast: weather,
                address: req.query.address
            });
        })
    })
})







app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    res.send({
        location: 'Blackpool, England',
        forecast: 'Sunny with a chance of rain.',
        address: req.query.address
    });
})







app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: "HELP ARTICLE NOT FOUND"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "PAGE NOT FOUND"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});
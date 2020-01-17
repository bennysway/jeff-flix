const express = require('express')
var jsrender = require('jsrender')


const app = express()



var book = require('./app/book')
var home = require('./app/home')
var signup = require('./app/signup')
var search = require('./app/search')
var preview = require('./app/preview')
var wishlist = require('./app/wishlist')
var cinemacity = require('./app/citycinemacity')

app.use('/',home)
app.use('/book',book)
app.use('/search',search)
app.use('/signup',signup)
app.use('/preview',preview)
app.use('/wishlist',wishlist)
app.use('/cinemacity',cinemacity)
app.use(express.static(__dirname + '/public'))

const PORT = process.env.PORT || 8080

app.get('/login', function (req, res) {
    const tmpl = jsrender.templates('./public/html/login.html');
    const html = tmpl.render()
    res.send(html)
});
app.get('/account', function (req, res) {
    const tmpl = jsrender.templates('./public/html/login.html');
    const html = tmpl.render()
    res.send(html)
});
app.get('/bookings', function (req, res) {
    const tmpl = jsrender.templates('./public/html/login.html');
    const html = tmpl.render()
    res.send(html)
})
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
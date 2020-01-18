var express = require('express')
var jsrender = require('jsrender');
var router = express.Router()

router.get('/', function (req, res) {
    var movieId = req.query.id
    var movieName = req.query.name
    const tmpl = jsrender.templates('./public/html/book.html');
    const html = tmpl.render({
        cities: cities,
        weekdays: weekdays,
        time: time,
        ticketType: ticketType,
        seatRow: seatRow,
        movieName: movieName,
        booking: booking,
        movieId: movieId
    })
    res.send(html)
});

module.exports = router;
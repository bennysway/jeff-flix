var express = require('express')
var jsrender = require('jsrender');
var router = express.Router()

router.get( function (req, res) {
    res.locals.user = req.user;
    res.locals.authenticated = !req.user.anonymous;
    next();
    const tmpl = jsrender.templates('./public/html/main.html');
    const html = tmpl.render({
        cities: cities,
        weekdays: weekdays,
        time: time,
        ticketType: ticketType,
        seatRow: seatRow,
        movieName: movieName
    })
    next()
});


module.exports = router;
var express = require('express')
var jsrender = require('jsrender');
var router = express.Router()
var fetch = require('node-fetch')
let settings = { method: "Get" }

router.get('/', function (req, res) {
    var searchString = req.query.search
    var bookings = []
    fetch('https://api.themoviedb.org/3/search/movie?query=' + searchString + '&api_key=d4c2d2239d0577b96a92cd3fab6e57be', settings)
        .then(res => res.json())
        .then((movie) => {
            var marray = movie.results
            var i;
            for (i = 0; i < marray.length; i++) {
                let bookingData = {
                    city: 0,
                    time: "null",
                    date: 0,
                    movieID: 0,
                    seatRow: 0,
                    seatNumber: 0,
                    movieName: "null",
                    ticketType: 0,
                    ticketAmount: 0,
                    poster: "",
                    bookingId: 0
                }
                
                bookingData.movieName = marray[i].original_title
                bookingData.date = marray[i].release_date
                bookingData.time = marray[i].vote_average + " stars"
                bookingData.seatRow = marray[i].original_language
                bookingData.seatNumber = marray[i].popularity
                bookingData.city = marray[i].vote_count
                bookingData.poster = marray[i].poster_path
                bookings.push(bookingData)
            }
            console.log(bookings)

            const tmpl = jsrender.templates('./public/html/bookings.html');
            const html = tmpl.render({ bookings: bookings, isBookable : true })
            res.send(html)
        })
});

module.exports = router;
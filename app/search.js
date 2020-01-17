var express = require('express')
var jsrender = require('jsrender');
var router = express.Router()
var fetch = require('node-fetch')
let settings = { method: "Get" }

router.get('/', function (req, res) {
    var movieId = req.query.id
    fetch('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=d4c2d2239d0577b96a92cd3fab6e57be', settings)
        .then(res => res.json())
        .then((movie) => {
            const tmpl = jsrender.templates('./public/html/preview.html');
            const html = tmpl.render({ movie: movie })
            res.send(html)
        })
});

module.exports = router;
var express = require('express')
const fetch = require('node-fetch')
const cookies = require('js-cookie')
const jsrender = require('jsrender')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const router = express.Router()
let url1 = "https://api.themoviedb.org/3/discover/movie?api_key=d4c2d2239d0577b96a92cd3fab6e57be&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
let url2 = "https://api.themoviedb.org/3/discover/movie?api_key=d4c2d2239d0577b96a92cd3fab6e57be&/discover/movie/?language=PL&region=PL&sort_by=vote_average.desc&include_video=false&page=1";
let settings = { method: "Get" }

router.get('/', function (req, res) {
    fetch(url1, settings)
        .then(res => res.json())
        .then((moviesArray1) => {
            fetch(url2, settings)
                .then(res => res.json())
                .then((moviesArray2) => {
                    const tmpl = jsrender.templates('./public/html/home.html');
                    const html = tmpl.render({
                        moviesArray1: moviesArray1.results,
                        moviesArray2: moviesArray2.results
                    })
                    res.send(html)
                })
        })
        .catch(() => {
            const tmpl = jsrender.templates('./public/html/error.html');
            const html = tmpl.render({})
            res.cookie('bias', 'ikoko')
            res.send(html)
        })
})
module.exports = router;
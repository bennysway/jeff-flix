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
    var user = getUser()
    fetch(url1, settings)
        .then(res => res.json())
        .then((moviesArray1) => {
            fetch(url2, settings)
                .then(res => res.json())
                .then((moviesArray2) => {
                    const tmpl = jsrender.templates('./public/html/home.html');
                    const html = tmpl.render({
                        moviesArray1: moviesArray1.results,
                        moviesArray2: moviesArray2.results,
                        user: user
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

function getUser() {
    var user = {}
    var cookie = cookies.get('userCookie')
    if (cookie != undefined) {
        var userCookie = JSON.parse(cookies.get('userCookie'))
        if (userCookie.zita != "") {
            if (userCookie.pfura != "") {
                var testPass = db.get('users').find({ username: userCookie.zita }).value()
                console.log(testPass)
                if (testPass.password == userCookie.pfura) {
                    cookies.set('userCookie', JSON.stringify({ zita: username, pfura: "", logged: true }))
                    var details = db.get('contactDetails').find({ id: testPass.id }).value()
                    user = {
                        name: details.name
                    }
                } else {
                    alert("Wrong Password.")
                }
            } else if (userCookie.logged == true) {
                var testPass = db.get('users').find({ username: userCookie.zita }).value()
                console.log(testPass)
                var details = db.get('contactDetails').find({ id: testPass.id }).value()
                user = {
                    name: details.name
                }
            }
        }
    } else {
        console.log("no user cookie")
    }

    return user
}
module.exports = router;
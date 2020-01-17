var express = require('express')
var jsrender = require('jsrender')
var router = express.Router()

router.get('/', function (req, res) {
    const tmpl = jsrender.templates('./public/html/signup.html');
    const html = tmpl.render({   })
    res.send(html)
});

module.exports = router;
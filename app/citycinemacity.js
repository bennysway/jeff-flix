var express = require('express');
var jsrender = require('jsrender');


var router = express.Router();

// Home page route.
router.get('/', function (req, res) {
    const tmpl = jsrender.templates('./public/html/cinemacitycity.html');
    const html = tmpl.render({ data: results.data, found: results.found })
    console.log(results)
    res.send(html)
})


module.exports = router;

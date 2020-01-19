var express = require('express')
var jsrender = require('jsrender')
var cookieParser = require('cookie-parser')
var router = express.Router()

const cities = [
    {
        "value": 1088,
        "city": "Bielsko-Biała"
    },
    {
        "value": 1086,
        "city": "Bydgoszcz"
    },
    {
        "value": 1092,
        "city": "Bytom"
    },
    {
        "value": 1098,
        "city": "Cieszyn"
    },
    {
        "value": 1089,
        "city": "Częstochowa - Galeria Jurajska"
    },
    {
        "value": 1075,
        "city": "Częstochowa - Wolność"
    },
    {
        "value": 1073,
        "city": "Gdańsk - Krewetka - KINO ZAMKNIĘTE"
    }, {
        "value": 1085,
        "city": "Gliwice"
    },
    {
        "value": 1065,
        "city": "Katowice - Punkt 44"
    }, {
        "value": 1079,
        "city": "Katowice - Silesia"
    },
    {
        "value": 1090,
        "city": "Kraków - Bonarka"
    },
    {
        "value": 1076,
        "city": "Kraków - Galeria Kazimierz"
    },
    {
        "value": 1063,
        "city": "Kraków - Galeria Plaza"
    },
    {
        "value": 1064,
        "city": "Kraków - Zakopianka"
    },
    {
        "value": 1094,
        "city": "Lublin - Felicity"
    },
    {
        "value": 1084,
        "city": "Lublin - Plaza"
    },
    {
        "value": 1080,
        "city": "Łódź Manufaktura"
    },
    {
        "value": 1081,
        "city": "Poznań - Kinepolis"
    },
    {
        "value": 1078,
        "city": "Poznań - Plaza"
    },
    {
        "value": 1062,
        "city": "Ruda Śląska"
    },
    {
        "value": 1082,
        "city": "Rybnik"
    },
    {
        "value": 1083,
        "city": "Sosnowiec"
    },
    {
        "value": 1095,
        "city": "Starogard Gdański"
    },
    {
        "value": 1077,
        "city": "Toruń - Czerwona Droga"
    },
    {
        "value": 1093,
        "city": "Toruń - Plaza"
    },
    {
        "value": 1091,
        "city": "Wałbrzych"
    },
    {
        "value": 1074,
        "city": "Warszawa -  Arkadia"
    },
    {
        "value": 1061,
        "city": "Warszawa - Bemowo"
    },
    {
        "value": 1096,
        "city": "Warszawa - Białołęka Galeria Północna"
    },
    {
        "value": 1070,
        "city": "Warszawa - Galeria Mokotów"
    },
    {
        "value": 1069,
        "city": "Warszawa - Janki"
    },
    {
        "value": 1068,
        "city": "Warszawa - Promenada"
    },
    {
        "value": 1060,
        "city": "Warszawa - Sadyba"
    },
    {
        "value": 1067,
        "city": "Wrocław - Korona"
    },
    {
        "value": 1097,
        "city": "Wrocław - Wroclavia"
    },
    {
        "value": 1087,
        "city": "Zielona Góra"
    }
]
const weekdays = [
    {
        "name": "Sunday",
        "value": 7
    }, {
        "name": "Monday",
        "value": 1
    }, {
        "name": "Tuesday",
        "value": 2
    }, {
        "name": "Wednesday",
        "value": 3
    }, {
        "name": "Thursday",
        "value": 4
    }, {
        "name": "Friday",
        "value": 5
    }, {
        "name": "Saturday",
        "value": 6
    }
]
const time = [
    {
        "name": "Morning",
        "value": 1
    }, {
        "name": "Noon",
        "value": 2
    }, {
        "name": "Afternoon",
        "value": 3
    }, {
        "name": "Twighlight",
        "value": 4
    }, {
        "name": "Evening",
        "value": 5
    }, {
        "name": "Late Night",
        "value": 6
    },{
        "name": "Custom",
        "value": 7
    }
]
var booking = false
const ticketType = [
    {
        "name": "Normal",
        "value": 1
    }, {
        "name": "Student",
        "value": 2
    }, {
        "name": "Reduced",
        "value": 3
    }, {
        "name": "Veteran",
        "value": 4
    }, {
        "name": "Senior",
        "value": 5
    }
]
const seatRow = [
    {
        "name": "Front Row",
        "value": 1
    },{
        "name": "First Quarter",
        "value": 2
    },{
        "name": "Mid",
        "value": 3
    },{
        "name": "Premium",
        "value": 4
    },{
        "name": "Back Row",
        "value": 5
    },{
        "name": "Custom",
        "value": 6
    }
]


router.use(cookieParser())

router.get('/', function (req, res) {
    var hasBooking = false
    var bookings = {}
    var cookie = req.cookies.bookings
    if (cookie != "") {
        hasBooking = true
        bookings = JSON.parse(cookie)
        bookings = sanitizeBooking(bookings)
    }
    const tmpl = jsrender.templates('./public/html/bookings.html');
    const html = tmpl.render({ bookings: bookings, hasBooking: hasBooking })
    res.send(html)
});
function sanitizeBooking(bookings) {
    var m = bookings
    var i;
    
    for (i = 0; i < m.length; i++) {

        m[i].city = cities.find(x => x.value == m[i].city).city
        m[i].date = weekdays.find(weekdays => weekdays.value == m[i].date).name
        m[i].seatRow = seatRow.find(seatRow => seatRow.value == m[i].seatRow).name
    }
    
    return m
}

module.exports = router;
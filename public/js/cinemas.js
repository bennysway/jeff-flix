var cityId = -1
var city = -1
var countryId = -1
let settings = {
    method: "Get",
    headers: {
        'X-API-Key': 'OvXdDSnG19BOf6cpjPuJj0GOk85EukCU'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    }
}

function clearAll() {
    document.getElementById("countryId").selectedIndex = 0
    document.getElementById("stateId").selectedIndex = 0
    document.getElementById("cityId").selectedIndex = 0
}

function setCountry(idd) {
    countryId = idd
    console.log(idd)
}
function setCity(idd) {
    city = idd
    console.log(idd)
}

function search() {
    var opt1 = document.getElementById("countryId").selectedIndex
    var opt2 = document.getElementById("stateId").selectedIndex
    var opt3 = document.getElementById("cityId").selectedIndex
    if (opt1 == 0 || opt2 == 0 || opt3 == 0) {
        alert("Please fill in all fields");
    } else {
        var url = "https://api.internationalshowtimes.com/v4/cities?countries=" + countryId
        fetch(url, settings)
            .then(res => res.json())
            .then((fetchResults) => {
                console.log(fetchResults.cities)

                for (var i =0; i<fetchResults.cities.length; i++) {
                    if (fetchResults.cities[i].slug == city.toLowerCase()) {
                        cityId = fetchResults.cities[i].id
                    }
                    else console.log(fetchResults.cities[i].slug)
                }
                if (cityId == -1) {
                    alert("Could not find any cinemas in our database from this city. Try another place.")
                } else searchCinemas()
            }).catch(e =>{
                alert("We cannot show you other countries at this moment. API limitations")
            })
    }
}

function searchCinemas() {
    var text = ""
    var url = "https://api.internationalshowtimes.com/v4/cinemas?city_ids=" + cityId
    fetch(url, settings)
        .then(res => res.json())
        .then((fetchResults) => {
            console.log(fetchResults)

            for (var i = 0; i<fetchResults.cinemas.length; i++) {
                text += "<div class=\"cinemaItem\">"
                text += "<h2 id=\"name\">" + fetchResults.cinemas[i].name + "</h2>"
                text += "<h3 id=\"address\">" + fetchResults.cinemas[i].location.address.display_text + "</h3>"
                text += "<a id=\"web\" href=\"" + fetchResults.cinemas[i].website +"\">" + fetchResults.cinemas[i].website + "</a>"
                text += "<h5 id=\"phone\">" + fetchResults.cinemas[i].telephone + "</h5>"
                text += "</div>"
            }
            document.getElementById("list").innerHTML = text
        })
}
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
    poster:""
}
function onSelectCity() {
    let select = document.getElementById('selectCity')
    let value = select.options[select.selectedIndex].value
    updateCity(value)
}
function onSelectDay() {
    let select = document.getElementById('selectDay')
    let value = select.options[select.selectedIndex].value
    updateDate(value)
}
function onSelectTime() {
    let x = document.getElementById("selectTime").value
    switch (x) {
        case '1':
            document.getElementById("customTime").value = "10:00:00"
            updateTime("10:00:00")
            break
        case '2':
            document.getElementById("customTime").value = "12:00:00"
            updateTime("12:00:00")
            break
        case '3':
            document.getElementById("customTime").value = "15:00:00"
            updateTime("15:00:00")
            break
        case '4':
            document.getElementById("customTime").value = "18:00:00"
            updateTime("18:00:00")
            break
        case '5':
            document.getElementById("customTime").value = "20:00:00"
            updateTime("20:00:00")
            break
        case '6':
            document.getElementById("customTime").value = "21:00:00"
            updateTime("21:00:00")
            break
        case '7':
            document.getElementById("customTime").value = "12:00:00"
            updateTime("12:00:00")
            break
        default:
            updateTime("12:00:00")
            break;
    }
}
function onSelectTickeType() {
    let select = document.getElementById('selectTicketType')
    let value = select.options[select.selectedIndex].value
    updateTicketType(value)
}
function onSelectSeat() {
    let select = document.getElementById('selectSeat')
    let value = select.options[select.selectedIndex].value
    updateSeat(value)
}
function onSelectSeatRow() {
    let select = document.getElementById('selectSeat')
    let value = select.options[select.selectedIndex].value

    updateTicketRow(value)
}
function onInputSeatNumber() {
    let input = document.getElementById('inputSeatNumber')
    let value = input.value

    updateSeatNumber(value)
}
function onInputTicketAmount() {
    let input = document.getElementById('inputTicketAmount')
    let value = input.value
    updateTicketAmount(value)
}
function updateTime(time) {
    bookingData.time = time
}
function updateSeatNumber(value) {
    bookingData.seatNumber = value
}
function updateCity(city) {
    bookingData.city = city
}
function updateDate(date) {
    bookingData.date = date
}
function updateTicketType(type) {
    bookingData.ticketType = type
}
function updateTicketAmount(amount) {
    bookingData.ticketAmount = amount
}
function updateTicketRow(row) {
    bookingData.seatRow = row
}
function book() {
    if (getFields()) {
        booking = true
        let cookieString = getCookie("bookings")
        if (cookieString != "") {
            let allBookings = JSON.parse(getCookie("bookings"))
            allBookings.push(bookingData)
            setCookie("bookings", JSON.stringify(allBookings), 13)
        } else {
            let allBookings = []
            console.log("Empty cookie")
            allBookings.push(bookingData)
            setCookie("bookings", JSON.stringify(allBookings), 13)
        }
        alert("Booking Saved")
        window.location.href = "/"
    }
}
function getFields() {
    var qs =  getQueryParams(document.location.search)
    var id = qs.id
    var name = qs.name
    var poster = qs.poster_path
    bookingData.movieID = id
    bookingData.movieName = name
    bookingData.poster = poster
    console.log(poster);
    if (bookingData.city == 0) {
        alert("Please choose city")
        return false
    }
    else if (bookingData.time == "null") {
        alert("Please choose Time")
        return false
    }
    else if (bookingData.date == 0) {
        alert("Please choose Day")
        return
    }
    else if (bookingData.seatRow == 0) {
        alert("Please choose Row")
        return false
    }
    else if (bookingData.seatNumber == 0) {
        alert("Please choose Seat Number")
        return false
    }
    else if (bookingData.ticketType == 0) {
        alert("Please choose Ticket type")
        return false
    }
    else if (bookingData.ticketAmount == 0) {
        alert("Please choose number of tickets")
        return false
    } else
        return true
}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }
    return params;
}

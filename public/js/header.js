var template = $.templates("#userControl");
let user = {
    "isLoggedIn": false,
    "name": "meme",
    "surname": "",
    "email": "",
    "telephone": ""
}
var htmlOutput = template.render({ user: user });
$("#usernav").html(htmlOutput);
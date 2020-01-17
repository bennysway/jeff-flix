function login() {
    var username = document.getElementById('txtEmail').value
    var password = document.getElementById('inputPassword').value

    if(username!="" && password!=""){
        setCookie("userCookie",JSON.stringify({zita : username,pfura: password,logged:false,id:0}),1)
    }
    location.href = '/'
}

function signup(){

}
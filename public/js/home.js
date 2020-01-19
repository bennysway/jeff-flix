function addToWishList(wish) {
    let cookieString = getCookie("wishings")
    if (cookieString != "") {
        let allwishings = JSON.parse(getCookie("wishings"))
        allwishings.push(wish)
        setCookie("wishings", JSON.stringify(allwishings), 13)
    } else {
        let allwishings = []
        console.log("Empty cookie")
        allwishings.push(wish)
        setCookie("wishings", JSON.stringify(allwishings), 13)
    }
    alert("Added!")
}
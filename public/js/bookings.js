var showingCards = true
function toggle() {
    if (showingCards) {
        document.getElementById('cards').style.display = "none"
        document.getElementById('list').style.display = "block"
        showingCards = !showingCards
    } else{
        document.getElementById('list').style.display = "none"
        document.getElementById('cards').style.display = "block"
        showingCards = !showingCards
    }
}
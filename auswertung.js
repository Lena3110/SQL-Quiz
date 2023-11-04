function showScore(elementID) {
    document.getElementById(elementID).innerHTML = localStorage.getItem('score')
}

function showScore(elementID) {
    document.getElementById(elementID).innerHTML = localStorage.getItem('score')        // die InnerHTML wird durch den Punktescore ersetzt, welcher aus dem LocalStorage abgerufen wird
}
localStorage.setItem("score", 0)

function parseSingleChoice(formName, formValueName, submitID, correctAnswer) {
    let score = parseFloat(localStorage.getItem('score'))
    let answer = document.forms[formName][formValueName].value;
    let inputs = document.querySelectorAll("form[name="+formName+"] input")
    let divs = document.querySelectorAll("form[name="+formName+"] div")
    // Wählt alle input und div Elemente aus dem form
    
    let correctDiv = document.querySelector("form[name="+formName+"] input[value="+correctAnswer+"]").closest("div")
    let wrongDivs = []
    for (div of divs) {if (div != correctDiv) {wrongDivs.push(div)}} // Fügt alle divs zu wrongDivs hinzu, die nicht korrekt sind
    
    if (answer == '') {
        alert('Bitte geben Sie eine Antwort ab!')
    }       // Wenn keine antwort ausgewählt ist, wird eine Meldung abgegeben
    else if (answer == correctAnswer) {
        score += 1
        correctDiv.style.backgroundColor = "rgba(9,121,24,1)";
        correctDiv.style.color = 'white';
        document.getElementById(submitID).disabled = true;
        for (element of inputs) {
            element.disabled = true;
        }       // wenn richtige Antwort ausgewählt, wird diese grün eingefärbt, auswahl und Submit Button deaktiviert
    }
    else {
        correctDiv.style.backgroundColor = "rgba(9,121,24,1)";
        for (div of wrongDivs) {div.style.backgroundColor = "red";}
        document.getElementById(submitID).disabled = true;
        for (element of inputs) {element.disabled = true;}
        for (div of divs) {div.style.color = 'white';}      /* Bei Auswahl der falschen Antwort, werden die
         falschen Antworten rot und die richtige Antwort grün eingefärbt, Sperrung der auswahl und des Buttons erfolgt*/
    }  
    localStorage.setItem("score", score)   
}

function parseGapText(formName, submitID, correctAnswers) {
    let score = parseFloat(localStorage.getItem('score'))
    let inputs = document.querySelectorAll("form[name="+formName+"] input")
    let answers = []        //Definition der Variablen
    for (input of inputs) {
        answers.push(input.value)
    }       // in Array der Lösungen werden Antworten hinzugefügt

    for (answer of answers) {
        if (answer == '') {
            alert('Bitte tragen Sie in jede Lücke etwas ein!')
            return
        }           // bei fehlenden Antworten, wird eine Nachricht gesendet
    }

    for (let i = 0; i < answers.length; i++) {      // geht Array durch
        if (inputs[i].value == correctAnswers[i]) {
            score += 1                              // je richtig ausgefüllte Lücke wird der Score im Localstorage um einen Punkt hochgesetzt
            inputs[i].style.color = "rgba(9,121,24,1)"
            inputs[i].disabled = true           // wenn richtige Antwort, grünfärbung und deaktivierung
        } else {
            inputs[i].style.color = "red"           // wenn falsche Antwort rotfärbung Deaktivierung
            inputs[i].value += ' ('+ correctAnswers[i] +')'
            inputs[i].disabled = true
        }
    }
    document.getElementById(submitID).disabled = true;    
    localStorage.setItem("score", score) 
}

function parseTrueFalse(formName, formValueNames, submitID, correctAnswers) {
    let score = parseFloat(localStorage.getItem('score'))
    let answers = []
    let trs = document.querySelectorAll("form[name="+formName+"] tr")
    let inputs = document.querySelectorAll("form[name="+formName+"] input")     // Definition der Variablen
    for (valueName of formValueNames) {
        answers.push(document.forms[formName][valueName].value)     // HInzufügen der Antworten in Array
    }                                                                         
    if (answers.includes('')) {
        alert('Bitte geben Sie erst alle Antworten ab!')        
        return
    }
        
    
    for (let i = 0; i < answers.length; i++) {              // geht Array durch, wenn richtig grünfärbung
        if (answers[i] == correctAnswers[i]) {
            score += 1
            trs[i+1].style.color = "rgba(9,121,24,1)"
        } else {
            trs[i+1].style.color = "red"        // wenn falsch rotfärbung
        }
    }
      
    for (element of inputs) {
        element.disabled = true;
    }
    document.getElementById(submitID).disabled = true;      // Deaktivierung der ButtonS
    localStorage.setItem("score", score)
}


function parseSelectionText(formName, submitID, correctAnswers) {
    let score = parseFloat(localStorage.getItem('score'))
    let inputs = document.querySelectorAll("form[name="+formName+"] input")     //Definition Variablen
    let answers = []
    for (input of inputs) {
        answers.push(input.value)
    }

    for (correctAnswer of correctAnswers) {
        if (!answers.includes(correctAnswer)) {
            alert('Diese Werte sind ungültig!')
            return                                  //bei fehlender Eingabe Benachrichtigung
        }
    }

    for (let i = 0; i < answers.length; i++) {
        if (inputs[i].value == correctAnswers[i]) {
            inputs[i].style.color = "rgba(9,121,24,1)"
            inputs[i].disabled = true               // durchgehen des Arrays, bei Übereinstimmunen grün-, bei falscher Eingabe rotfärbung
            score += 1                              //der Score wird im Localstorage um 1 erhöht
        } else {
            inputs[i].style.color = "red"
            inputs[i].value += ' ('+ correctAnswers[i] +')'
            inputs[i].disabled = true
        }
    }
    document.getElementById(submitID).disabled = true;      //Deaktivierung des Buttons
    localStorage.setItem("score", score)
}

function parseMultipleChoice(formName, submitID, correctAnswers) {
    let score = parseFloat(localStorage.getItem('score'))
    let inputs = document.querySelectorAll("form[name="+formName+"] input")
    let answers = []                    //Definiton aller Variablen
    for (input of inputs) {
        answers.push(input.checked)         //Antworten kommen in Lösungsarray
    }

    let divs = document.querySelectorAll("form[name="+formName+"] div")

    for (let i = 0; i < answers.length; i++) {
        if (answers[i] == correctAnswers[i]) {
            divs[i].style.backgroundColor = "rgba(9,121,24,1)";
            divs[i].style.color = "white";
            inputs[i].disabled = true
            score += 0.5
        } else {                                        //geht durch Array durch, wenn richtig grünfärbung, sonst rotfärbung
            divs[i].style.backgroundColor = "red";
            divs[i].style.color = "white";
            inputs[i].disabled = true
        }
    }
    document.getElementById(submitID).disabled = true;      //Deaktivierung
    localStorage.setItem("score", score)
}



let userAnswers = [];
let questionAnswers = [];
var xmldoc;

function loadQuiz(){
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log("JSON data written to variable record");
            xmldoc = xhr.responseXML;
            displayQuiz(xmldoc);
            console.log("Quiz Record", xmldoc);
        }
    };

    xhr.open("GET", "/quiz/FinalQuiz.xml", true);
    xhr.send();
     
}

function displayQuiz(xmldoc){
    console.log('DisplayQuiz xmldoc: ', xmldoc)
    let quizText = "";
    var x = xmldoc.getElementsByTagName("question");
    
    console.log('var x: ', x)

  for (i = 0; i <x.length; i++) 
  { 
        quizText += "<div class='questionText'> <b>"
        let qnumber =  x[i].getElementsByTagName("qnumber")[0].childNodes[0].nodeValue;
        quizText += qnumber + ". </b> "
        quizText += x[i].getElementsByTagName("qtitle")[0].childNodes[0].nodeValue + "</div>";

        quizText += "<div class='answers'>";

        quizText += "<div class='question' id='question" + qnumber + "a' onclick='userAnswerArray(" + qnumber + ',"a"' + ");return false'>" + "a) " + x[i].getElementsByTagName("a")[0].childNodes[0].nodeValue + "</div>";

        quizText += "<div class='question' id='question" + qnumber + "b' onclick='userAnswerArray(" + qnumber + ',"b"' + ");return false'>" + "b) " + x[i].getElementsByTagName("b")[0].childNodes[0].nodeValue + "</div>";

        quizText += "<div class='question' id='question" + qnumber + "c' onclick='userAnswerArray(" + qnumber + ',"c"' + ");return false'>" + "c) " + x[i].getElementsByTagName("c")[0].childNodes[0].nodeValue + "</div>";

        quizText += "<div class='question' id='question" + qnumber + "d' onclick='userAnswerArray(" + qnumber + ',"d"' + ");return false'>" + "d) " + x[i].getElementsByTagName("d")[0].childNodes[0].nodeValue + "</div>";

        quizText += "</div>";

        quizText += "<BR>"
        quizText += "</div>"

        
    }

    quizText += "<input type='button' value='Submit Quiz' onclick='gradequiz();return false'><BR>"

    document.getElementById("quizTextHere").innerHTML = quizText
    
}



//userAnswerArray(i,x) will take the parameters of the question number and answer letter,
//and use them to update the user answer array. It will also highlight the answer chosen in blue.
//
//I should probably rename this function to something more accurate,
//but I am too lazy and sleepy to change the other JS code.
function userAnswerArray(i, answ){
    userAnswers[i-1] = answ;

    document.getElementById("question" + i + 'a').style.border = "1px solid grey";
    document.getElementById("question" + i + 'a').style.boxShadow = "none";
    document.getElementById("question" + i + 'b').style.border = "1px solid grey";
    document.getElementById("question" + i + 'b').style.boxShadow = "none";
    document.getElementById("question" + i + 'c').style.border = "1px solid grey";
    document.getElementById("question" + i + 'c').style.boxShadow = "none";
    document.getElementById("question" + i + 'd').style.border = "1px solid grey";
    document.getElementById("question" + i + 'd').style.boxShadow = "none";


    
    document.getElementById("question" + i + answ).style.border = "solid blue";
    document.getElementById("question" + i + answ).style.boxShadow = "0 0 10px blue";
    console.log("userAnswers[",i-1,"] set to: ", answ);
    console.log(userAnswers);

    
}

function gradequiz(){
    console.log("gradequiz function is doing its thing!")

  
    let rightAnswers = xmldoc.getElementsByTagName("rightanswers")[0].childNodes[0].nodeValue;

    console.log("rightAnswers.length: ", rightAnswers.length);
    console.log("rightAnswers: ", rightAnswers);

    //populate questionAnswers with the correct answers
    for(let j = 0; j <= rightAnswers.length; j++){
        if(j % 2 == 0){
        questionAnswers[j/2] = rightAnswers.substr(j,1);
        console.log(questionAnswers[j]);
        }
    }

    console.log("questionAnswers: ", questionAnswers)
    console.log("userAnswers: ", userAnswers)

    correctAnswers = 0;

    if(questionAnswers.length == userAnswers.length){
        for(let i = 0; i < questionAnswers.length; i++){
            if(questionAnswers[i] == userAnswers[i]){
                correctAnswers++;
                document.getElementById("question" + (i + 1) + questionAnswers[i]).style.border = "solid green";
                document.getElementById("question" + (i + 1) + questionAnswers[i]).style.boxShadow = "0 0 10px green";
            }else{
                console.log("question" + (i + 1) + userAnswers[i]);
            document.getElementById("question" + (i + 1) + userAnswers[i]).style.border = "solid red";
            document.getElementById("question" + (i + 1) + userAnswers[i]).style.boxShadow = "0 0 10px red";
            }
        }
        let returnmessage = "<BR>Your grade is " + correctAnswers + "/" + questionAnswers.length;
        document.getElementById("quizResults").innerHTML = returnmessage;
    } else{
        alert("You have not answered one or more questions in the quiz!");
    }

    console.log("rightAnswers: ", rightAnswers, rightAnswers.length);
    
}
var time = document.getElementById('timer');
var startButton = document.getElementById('startBtn');
var questionContainer = document.getElementById('question-container');
var questionEl = document.getElementById('quiz-question');
var buttonns = document.getElementById('buttonn');
var openningContainer = document.getElementById('openning');
var correctEl = document.getElementById('correct-answer');
var wrongEl = document.getElementById('wrong-answer');
var answerEl = document.getElementById('answer');
var questions = [ 
    {
        question: "Arrays in Javascript can be used to store ______.",
        answerArr: [
            { text: "Numbers and strings", correct:"Numbers and strings"}, 
            { text: "other arrays"}, 
            { text: "booleans"}, 
            { text: "all of the above", }
        ],
    },
    {
        question: "What tag is used to define an unordered list that is bulleted?",
        answerArr:[ 
                { text: '<ul>'},
                { text: '<lu>'}, 
                { text: '<li>', correct: "<li>"}, 
                { text: '<u>'}
            ],    
    },
    {
        question: "What elements are used to test for TRUE or False values stored in variables?",
        answerArr: [
            { text: 'For loops'},
            { text: 'Conditional statements.', correct: "Conditional statements."},
            { text: 'Regular Expressions.'}, 
            { text: 'Comparison and logical operators.'},
        ],  
    },
    {
        question: "In JavaScript, what element is used to store multiple values in a single variable?",
        answerArr: [
            { text: 'Functions'},
            { text: 'Variables'}, 
            { text:  'Strings'}, 
            { text: 'Arrays', correct: true},
        ],
        
    },
];
startButton.addEventListener("click", startGame);
buttonns.addEventListener("click", function() {
    questionIndex +=1;
    displayNextQuestion();
});

var shuffleQuestions, questionIndex;

var sec = 75;
//Timer start, Start quiz, display the first random question
function startGame() {
    startButton.classList.add('hide');
    openningContainer.classList.add('hide');
    questionContainer.classList.remove('hide');
    shuffleQuestions = questions.sort(() => Math.random() - 0.5);
    questionIndex = 0;
    if (open === 'visible'){
        openningContainer.style.visibility = 'hidden';
    }
    
    var timeCount = setInterval(function(){
        time.textContent = sec;
        sec--;
        if (sec <= 0) {
            clearInterval(timeCount);
        }
    }, 1000); 
    displayNextQuestion();
 }

 function displayNextQuestion() {
    showQuestion(shuffleQuestions[questionIndex]);
 }

 function showQuestion(question) {
    questionEl.innerHTML = question.question;
    question.answerArr.forEach(answer => {
    var newButton = document.createElement('button');   
    newButton.innerText = answer.text;
    newButton.classList.add('buttonns');
    if (answer.correct) {
        newButton.dataset.correct = answer.correct;
    }        
    newButton.addEventListener('click', selectAnswer);
    answerEl.appendChild(newButton);
 });
}
     
function selectAnswer(e) {
    var selectedButton = e.target;
    var corrects = selectedButton.dataset.correct;
    setStatusClass(document.body, corrects);
    Array.from(questionEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
}
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        sec += 10;        
        correctEl.classList.remove('hide');
        console.log('correctAns');
    } else {       
        wrongEl.classList.remove('hide');
        sec -= 10;
        console.log('Incorrect');
    }  
}
function clearStatusClass(element) {
    element.classList.remove('hide');
}

  


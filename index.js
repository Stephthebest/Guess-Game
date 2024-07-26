const mainContent = document.querySelector("main")
const rulesButton = document.getElementById("rules-btn");
const dialogRules = document.getElementById("dialog-rules");
const dialogExitBtn = document.getElementById("dialog-exit-btn");

// players playersInput//
const playersInputs = document.getElementById("players-inputs");
const questionerName = document.getElementById("questioner");
const guesserName = document.getElementById("opponent");
const setAttempts = document.getElementById("set-attempts")
const beginGameBtn = document.getElementById("begin-button");


// questioner ask //

const questionerForm = document.getElementById("questioner-ask");
const question = document.getElementById("question");
const questionerAnswer = document.getElementById("questioner-answer");
const questionSubmitBtn = document.getElementById("question-submit");

// question display //

const questionDisplay = document.getElementById("question-display");
const questionDisplayBox = document.getElementById("question-display-box");
const answerBox = document.getElementById("answer-box");
const guesserSubmitBtn = document.getElementById("guesser-submit-btn");

// score board//

const scoreBoard = document.getElementById("score-board");
const attemptsCount = document.getElementById("attempts-count");
const questionerScore = document.getElementById("questioner-score");
const guesserScore = document.getElementById("opponent-score");

// next round and reset round//

const nextRoundBtn = document.getElementById("next-round-btn")
const resetGameBtn = document.getElementById("reset-game-btn")


////
let attempts;
let roundAttempts;
let questionerScoreTracker = 0;
let guesserScoreTracker = 0;
const endGameScore = 3
let answerToQuestion;
let guesserAnswer;
let questioner;
let guesser;


rulesButton.addEventListener("click", ()=>{
    dialogRules.showModal()
})

dialogExitBtn.addEventListener("click", ()=>{
    dialogRules.close();
})

function playersName(questioner, guesser){ 
 return `
<section id="player-names">
<p class="players-names">Questioner - ${questioner}</p>
<p class="players-names">Guesser - ${guesser}</p>
</section>`
}



function beginGame (){
    attempts = setAttempts.value
    roundAttempts = attempts;
    attemptsCount.innerText = `Attempts - ${roundAttempts}`
    mainContent.insertAdjacentHTML("afterbegin", playersName(questioner,guesser))
    playersInputs.classList.toggle("hidden")
    questionerForm.classList.toggle("hidden")
    scoreBoard.classList.toggle("hidden")
}


function checkForEmptyInput(){
    questioner = questionerName.value;
     guesser = guesserName.value;
     if (questioner === ""){
        const newP = document.createElement("p")
        newP.innerText = "Please enter a name"
         questionerName.insertAdjacentElement("afterend", newP)
         setTimeout(()=>{
            newP.remove()
         }, 1000)
         return
     } else if (guesser === ""){
        const newP = document.createElement("p")
        newP.innerText = "Please enter a name"
         guesserName.insertAdjacentElement("afterend", newP)
         setTimeout(()=>{
            newP.remove()
         }, 1000)
         return
    }
    beginGame()
}

beginGameBtn.addEventListener("click", (e)=>{
    e.preventDefault() 
    checkForEmptyInput()
    // beginGame()
})

function questionSubmit(){
    answerToQuestion = questionerAnswer.value;
   questionDisplayBox.innerText = question.value
   questionDisplay.classList.toggle("hidden")
}



questionSubmitBtn.addEventListener("click", ()=>{
    if(question.value === ""){
                const newP = document.createElement("p")
                newP.innerText = "Please enter a question"
                 question.insertAdjacentElement("afterend", newP)
                 setTimeout(()=>{
                    newP.remove()
                 }, 1000)
                 return
               } else if(questionerAnswer.value === ""){
                const newP = document.createElement("p")
                newP.innerText = "Please enter an answer"
                 questionerAnswer.insertAdjacentElement("afterend", newP)
                 setTimeout(()=>{
                    newP.remove()
                 }, 1000)
                 return
               }
    questionSubmit()
    questionerForm.classList.toggle("hidden")
    
})


function checkGuesser (){
    if (answerBox.value=== ""){
        const newP = document.createElement("p")
                newP.innerText = "Please enter an answer"
                 answerBox.insertAdjacentElement("afterend", newP)
                 setTimeout(()=>{
                    newP.remove()
                 }, 1000)
                 return
    }
}

guesserSubmitBtn.addEventListener("click", ()=>{
    checkGuesser()
    if (answerBox.value === answerToQuestion){
        guesserScoreTracker += 1;
        disableBtn(guesserSubmitBtn, true)
        guesserScore.innerText = `Guesser - ${guesserScoreTracker}`
        nextRoundBtn.classList.toggle("hidden");
    } else {
        roundAttempts -= 1
        attemptsCount.innerText = `Attempts - ${roundAttempts}`
        attemptsCounter()
    }
    answerBox.value= ""
    endGame()
})


function attemptsCounter(){
    if (roundAttempts === 0){
        questionerScoreTracker += 1;
        disableBtn(guesserSubmitBtn, true)
        questionerScore.innerText = `Questioner - ${questionerScoreTracker}`
        nextRoundBtn.classList.toggle("hidden");
    }
}




nextRoundBtn.addEventListener("click", ()=>{
nxtRound()
})

function nxtRound(){
  nextRoundBtn.classList.toggle("hidden")
  questionDisplay.classList.toggle("hidden")
  questionerForm.classList.toggle("hidden")
  question.value= ""
  questionerAnswer.value = ""
  roundAttempts = attempts
  attemptsCount.innerText = `Attempts - ${roundAttempts}`
 disableBtn(guesserSubmitBtn, false)
}


function endGame () {
    if (guesserScoreTracker === endGameScore){
        disableBtn(guesserSubmitBtn, true)
        mainContent.insertAdjacentHTML("beforeend", `<section id="winner">
        <p>The winner is ${guesserName.value}</p>
        <p>Sorry ${questionerName.value} better luck next time!</p>
        </section`)
        resetGameBtn.classList.toggle("hidden")
       nextRoundBtn.classList.toggle("hidden")
    } else if(questionerScoreTracker === endGameScore){
        disableBtn(guesserSubmitBtn, true)
        mainContent.insertAdjacentHTML("beforeend", `<section id="winner">
        <p>The winner is ${questionerName.value}</p>
        <p>Sorry ${guesserName.value} better luck next time!</p>
        </section`)
        resetGameBtn.classList.toggle("hidden")
        nextRoundBtn.classList.toggle("hidden")
    }
}



resetGameBtn.addEventListener("click", ()=>{
resetGame()
})



function resetGame (){
   attempts = ""
   roundAttempts = attempts
   playersInputs.classList.toggle("hidden");
   questionDisplay.classList.toggle("hidden");
   resetGameBtn.classList.toggle("hidden");
   scoreBoard.classList.toggle("hidden")
   question.value = ""
   questionerAnswer.value=""
   resetHTML()
}

function resetHTML (){
    questionerScore.innerText = "Questioner";
    attemptsCount.innerText = "Attempts";
    guesserScore.innerText = "Guesser";
    const playerNames = document.getElementById("player-names");
    const winner = document.getElementById("winner");
    winner.remove();
    playerNames.remove();
    playersInputs.reset();
}

function disableBtn (el,boolean){
    el.disabled = boolean;
}

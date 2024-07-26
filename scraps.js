
function playersNames (questioner, guesser){
    return `<section id="player-names"> 
    <p class="questioner-name players">Questioner - ${questioner}</p> 
    <p class="opponent-name players">Guesser - ${guesser}</p> </section>`
}

function matchSummary (winner,loser){
    `<section id="match-winner>
     <p>The winner is ${winner}, You did it!</p>
     <p>Sorry ${loser} better luck next time!</p>
    </section>`
}

function beginGame (){
     questioner = questionerName.value;
     opponent = guesserName.value;
    mainContent.insertAdjacentHTML("afterbegin", playersNames(questioner,opponent));
    playersInputs.classList.toggle("hidden");
    questionerForm.classList.toggle("hidden");
    scoreBoard.classList.toggle("hidden");
    attempts = setAttempts.value;
    roundAttempts = attempts
    attemptsCount.innerText = `Attempts - ${roundAttempts}`;
    playersInputs.reset();
}

beginGameBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    beginGame();
})


questionSubmit.addEventListener("click", ()=>{
    questionDisplay.classList.toggle("hidden");
    questionerForm.classList.toggle("hidden");
    questionDisplayBox.innerText = question.value;
    answerToQuestion = questionerAnswer.value;
    nextRoundBtn.classList.toggle("hidden")
    nextRoundBtn.disabled = true;
    question.value = "";
    questionerAnswer.value="";
   
})


function guesserSubmit (){
    guesserAnswer = answerBox.value
    const correctAnswer = guesserAnswer.toLowerCase() === answerToQuestion.toLowerCase();
    if (correctAnswer){
        playerScoreTracker += 1;
        opponentScore.innerText = `Guesser - ${playerScoreTracker}`
        nextRoundBtn.disabled = false;
        guesserSubmitBtn.disabled = true;
        answerBox.value = ""
    }
    else{
        roundAttempts -= 1;
        attemptsCount.innerText = `Attempts - ${roundAttempts}`
        if (roundAttempts === 0){
            questionerScoreTracker += 1;
             questionerScore.innerText = `Questioner - ${questionerScoreTracker}`;
             nextRoundBtn.disabled = false;
             guesserSubmitBtn.disabled = true;
             answerBox.value = ""
        }
    }
       
}



guesserSubmitBtn.addEventListener("click", ()=>{
   guesserSubmit();

})


nextRoundBtn.addEventListener("click", ()=>{
    questionerForm.classList.toggle("hidden");
    questionDisplay.classList.toggle("hidden");
    roundAttempts = attempts
    attemptsCount.innerText = `Attempts - ${roundAttempts}`
    guesserSubmitBtn.disabled = false;
    nextRoundBtn.classList.toggle("hidden")
})


function reset (){
    questioner = "";
    opponent = "";
    attempts = "";
    roundAttempts = "";
    answerToQuestion = "";
    guesserAnswer = "";
    questionerScoreTracker = 0;
    playerScoreTracker = 0;
}


    if (playerScoreTracker === 3){
    mainContent.insertAdjacentElement("afterend", matchSummary(opponent, questioner))
    reset()
    } else if (questionerScoreTracker === 3){
       mainContent.insertAdjacentElement("afterend", matchSummary(questioner, opponent)) 
       reset()
    }
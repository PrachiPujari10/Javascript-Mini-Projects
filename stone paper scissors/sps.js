let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara =document.querySelector("#user-score");
const compScorePara =document.querySelector("#comp-score")

const genCompChoice = () => {
      //rock paper sissor
      const options =["stone", "paper" , "scissor"];
      const randIdx = Math.floor(Math.random()*3);
      return options[randIdx];
}

const drawGame = () => {
    console.log("game was draw");
    msg.innerText = "game was draw play again ";
    msg.style.backgroundColor = "#081b31";
}

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        console.log("you win");
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }

    else{
        compScore++;
        compScorePara.innerText = compScore;
        console.log("you lose");
        msg.innerText = `You lose!  ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

const playGame =(userChoice) => {
     console.log("user choice = ",userChoice);
     //generate computer choice
     const compChoice = genCompChoice();
     console.log("Computer choice = ",compChoice);

     if(userChoice === compChoice){
        //draw game
        drawGame();
     } else{
        let userwin = true;
        if(userChoice === "stone"){
            //sissors,paper
           userwin = compChoice === "paper" ? false : true;  
        } else if(userChoice === "paper"){
           userwin = compChoice === "scissor" ? false : true; 
        } else {
            //rock,paper
            userwin = compChoice === "paper" ? false : true;
        }
        showWinner(userwin, userChoice, compChoice);   
     }
};

choices.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click",() => {
        const userChoice = choice.getAttribute("id");
        console.log("choice was clicked" , userChoice);
        playGame(userChoice);
    });
});
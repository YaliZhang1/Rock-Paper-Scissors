// GLOBAL CONSTANTS AND VARIABLES
var humanScore = 0;
var computerScore = 0;
var currentRound = 1;
var rounds = 5;
const choices = ["rock", "paper", "scissors"];
const imgMap = {
  rock: "img/rock.png",
  paper: "img/paper.png",
  scissors: "img/scissors.png",
};

// Event
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".choiceButton");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const humanChoice = button.getAttribute("data-choice");
      startRound(humanChoice);
    });
  });
  const nextRoundButton = document.querySelector("#nextRoundButton");
  nextRoundButton.addEventListener("click", () => {
    prepareNextRound();
  });
  const newGameButton = document.querySelector("#newGameButton");
  newGameButton.addEventListener("click", () => {
    resetGame();
  });
});

// FUNCTIONS
function startRound(humanChoice) {
  const computerChoice = getComputerChoice();
  document.querySelector("#humanChoiceTitle").style.display = "none";
  document.querySelector("#buttonContainer").style.display = "none";

  document.querySelector("#personChoiceTitle").style.visibility = "visible";
  document.querySelector("#personChoiceImg").src = imgMap[humanChoice];
  document.querySelector("#personChoiceImg").style.visibility = "visible";

  document.querySelector("#computerChoiceTitle").style.visibility = "visible";
  document.querySelector("#computerChoiceImg").style.visibility = "visible";
  document.querySelector("#computerChoiceImg").src = imgMap[computerChoice];
  document.querySelector("#computerChoiceImg").style.transform = "scaleX(-1)";

  setTimeout(() => {
    playGame(humanChoice, computerChoice);
  }, 2000);
}

function getComputerChoice() {
  // Randomly return one of the choices
  return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(humanChoice, computerChoice) {
  let winner;
  // Determine and declare the winner
  if (humanChoice == computerChoice) {
    return "tie";
  } else if (
    (humanChoice == "rock" && computerChoice == "scissors") ||
    (humanChoice == "paper" && computerChoice == "rock") ||
    (humanChoice == "scissors" && computerChoice == "paper")
  ) {
    winner = "human";
  } else {
    winner = "computer";
  }

  return winner;
}

function playGame(humanChoice, computerChoice) {
  const winner = playRound(humanChoice, computerChoice);
  var disPlayResultText =
    "You: " + humanChoice + " | Computer: " + computerChoice;

  if (winner == "computer") {
    computerScore++;
    disPlayResultText +=
      "<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Computer won!";
  } else if (winner == "human") {
    humanScore++;
    disPlayResultText +=
      "<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp You won!";
  } else {
    humanScore += 0.5;
    computerScore += 0.5;
    disPlayResultText +=
      "<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp It's a tie!";
  }
  const resultDiv = document.querySelector("#resultForOneRoundText");
  resultDiv.innerHTML = disPlayResultText;
  resultDiv.style.opacity = 1;
  resultDiv.style.fontWeight = "bold";
  resultDiv.style.display = "flex";
  resultDiv.style.alignItems = "center";
  resultDiv.style.flexDirection = "column";

  updateScore();
  currentRound++;
  if (currentRound > rounds) {
    showFinalScore();
  } else {
    document.querySelector("#nextRoundButtonContainer").style.visibility =
      "visible";
  }
}

function showFinalScore() {
  const finalResultDiv = document.querySelector("#finalResultText");
  finalResultDiv.innerHTML = `Final Score:<br>You: ${humanScore}<br>Computer: ${computerScore}<br>${
    humanScore > computerScore
      ? "You won the game!"
      : computerScore > humanScore
      ? "Computer won the game!"
      : "The game is a tie!"
  }`;
  finalResultDiv.style.opacity = 1;

  document.querySelector("#newGameButtonContainer").style.visibility =
    "visible";
}

function updateScore() {
  document.querySelector(
    "#scoreInfo"
  ).innerHTML = `Score: You ${humanScore} - ${computerScore} Computer`;
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  currentRound = 1;
  document.querySelector("#finalResultText").style.opacity = 0;
  updateScore();
  document.querySelector("#roundInfo").innerText = `Round: ${currentRound}`;

  document.querySelector("#newGameButtonContainer").style.visibility = "hidden";

  prepareNextRound();
}

function prepareNextRound() {
  document.querySelector("#roundInfo").innerText = `Round: ${currentRound}`;

  document.querySelector("#nextRoundButtonContainer").style.visibility =
    "hidden";
  document.querySelector("#personChoiceTitle").style.visibility = "hidden";
  document.querySelector("#computerChoiceTitle").style.visibility = "hidden";
  document.querySelector("#personChoiceImg").style.visibility = "hidden";
  document.querySelector("#computerChoiceImg").style.visibility = "hidden";
  document.querySelector("#resultForOneRoundText").style.opacity = 0;

  document.querySelector("#humanChoiceTitle").style.display = "flex";
  document.querySelector("#buttonContainer").style.display = "flex";
}

const guess = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const wordDisplay = document.getElementById("wordDisplay");
const guessed = document.getElementById("guesses");

const words = [
  "javascript",
  "programming",
  "hangman",
  "developer",
  "openai",
  "react",
  "node",
  "express",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let remainingAttempts = 6;
let displayed = "";
console.log(selectedWord);

window.onload = function () {
  setWord();
};

guessButton.addEventListener("click", changeWord);

function setWord() {
  for (let i = 0; i < selectedWord.length; i++) {
    displayed += "_";
  }

  wordDisplay.textContent = displayed;
}

function changeWord() {
  let code = guess.value.charCodeAt(0);
  if (!(code > 64 && code < 91) && !(code > 96 && code < 123)) {
    return;
  }
  if (!guessedLetters.includes(guess.value)) {
    guessedLetters.push(guess.value);
    guessed.innerHTML = guessedLetters.join(", ");

    if (selectedWord.includes(guess.value)) {
      displayed = displayed.split("");

      let foundIndex = Array.from(
        selectedWord.matchAll(`${guess.value}`),
        (match) => match.index
      );

      foundIndex.forEach((element) => {
        displayed[element] = `${guess.value}`;
      });

      displayed = displayed.join("");
      wordDisplay.textContent = displayed;
      checkWin();
    }

    remainingAttempts--;
    checkLoss();
    guess.value = "";
  } else {
    alert("Guess a new Letter");
  }
}

function setWinBackgroundColor() {
  document.body.style.backgroundColor = "green";
}

function setLossBackgroundColor() {
  document.body.style.backgroundColor = "red";
}

function checkWin() {
  if (selectedWord == displayed) {
    wordDisplay.style.letterSpacing = `1px`;
    wordDisplay.textContent = "Congratulations! You won!";
    setWinBackgroundColor();
  }
}

function checkLoss() {
  if (remainingAttempts < 0) {
    wordDisplay.style.letterSpacing = `1px`;
    wordDisplay.textContent = "Game over! You lost.";
    setLossBackgroundColor();
  }
}

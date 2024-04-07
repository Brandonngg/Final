class Dice{
    roll(){
        return Math.floor(Math.random() * 6) + 1;
    }
}

class Player{
    constructor(name) {
        this.name = name;
        this.dice = [new Dice(), new Dice()];
        this.roundsPlayed = 0;
        this.roundScore = 0;
        this.totalScore = 0;
    }

    rollDice(){
        let diceValues = this.dice.map(dice => dice.roll());
        this.calculateRoundScore(diceValues);
        this.roundsPlayed++;
        return diceValues;
    }

    calculateRoundScore(diceValues){
        if(diceValues.includes(1)){
            this.roundScore = 0;
        } else if (diceValues[0] === diceValues[1]){
            this.roundScore = (diceValues[0] + diceValues[1]) * 2;
        } else{
            this.roundScore = diceValues[0] + diceValues[1];
        }
        this.totalScore += this.roundScore;
    }
}

let player = new Player('Player');
let computer = new Player('Computer');

function rollDiceForBoth() {
  if (player.roundsPlayed < 3 && computer.roundsPlayed < 3) {
    updateDiceImages('player', player.rollDice());
    updateDiceImages('computer', computer.rollDice());
    updateScores();
  } else {
    displayWinner();
  }
}

function updateDiceImages(playerType, diceValues) {
  const dice1 = document.getElementById(`${playerType}-dice-1`);
  const dice2 = document.getElementById(`${playerType}-dice-2`);
  dice1.src = `image/dice-${diceValues[0]}.png`;
  dice2.src = `image/dice-${diceValues[1]}.png`;
}

function updateScores() {
  document.getElementById('player-round-score').textContent = player.roundScore;
  document.getElementById('player-total-score').textContent = player.totalScore;
  
  document.getElementById('computer-round-score').textContent = computer.roundScore;
  document.getElementById('computer-total-score').textContent = computer.totalScore;
}

function displayWinner(){
  let winnerMessage = '';
  if(player.totalScore > computer.totalScore){
    winnerMessage = 'You Win! <img src="image/trophy.png" alt="win" class="popup-image"/>';
  }else if(player.totalScore < computer.totalScore){
    winnerMessage = 'You lose! <img src="image/money-with-wings.png" alt="lose" class="popup-image"/>';
  }else{
    winnerMessage = 'Tie!';
  }

  document.getElementById('winner-message').innerHTML  = winnerMessage;
  document.getElementById('winner-popup').classList.add('visible');

  document.getElementById('close-btn').addEventListener('click', function() {
    document.getElementById('winner-popup').classList.remove('visible');
  });
}

function resetGame() {
  player.roundsPlayed = 0;
  player.totalScore = 0;
  player.roundScore = 0;
  computer.roundsPlayed = 0;
  computer.totalScore = 0;
  computer.roundScore = 0;
  updateScores();
  const diceImages = document.querySelectorAll('.dice-img');
  diceImages.forEach(img => img.src = 'image/dice-1.png');

  document.getElementById('winner-popup').classList.remove('visible');
}

document.getElementById('roll-button').addEventListener('click', rollDiceForBoth);
document.getElementById('reset-button').addEventListener('click', resetGame);

document.getElementById('restart-btn').addEventListener('click', function() {
  resetGame();
  document.getElementById('winner-popup').classList.remove('visible');
});

document.getElementById('finish-btn').addEventListener('click', function() {
  document.getElementById('winner-popup').classList.remove('visible'); 
  
});

document.getElementById('toggle-rules').addEventListener('click', function() {
  const rules = document.getElementById('game-rules');
  if (rules.style.display === 'none') {
      rules.style.display = 'block';
      this.textContent = 'Hide Rules';
  } else {
      rules.style.display = 'none';
      this.textContent = 'Show Rules';
  }
});

document.getElementById('toggle-play').addEventListener('click', function() {
  const rules = document.getElementById('play-rules');
  if (rules.style.display === 'none') {
      rules.style.display = 'block';
      this.textContent = 'Hide tips';
  } else {
      rules.style.display = 'none';
      this.textContent = 'Show tips';
  }
});
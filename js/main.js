'use strict';

const settings = document.querySelectorAll('.pairs__option-item');
const goBTN = document.querySelector('.pairs__go');
const cards = document.querySelector('.pairs__cards');

const resetGame = () => {
  cards.innerHTML = '';
}


const checkSettings = options => {
  for (const option of options) {
    if (option.checked) {
      return option.value;
    }
  }
}

const beginGame = () => {
  resetGame();

  const cardsURL = 'https://raw.githubusercontent.com/Adalab/cards-data/master/' + checkSettings(settings) + '.json';

  fetch(cardsURL)
    .then(response => {
      const gameData = response.json();

      console.log(gameData);
    })
}

goBTN.addEventListener('click', beginGame);




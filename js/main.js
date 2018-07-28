'use strict';

const settings = document.querySelectorAll('.pairs__option-item');
const goBTN = document.querySelector('.pairs__go');
const cards = document.querySelector('.pairs__cards');

const maxVisibleCards = 2
let visibleCards = 0;

const resetGame = () => {
  cards.innerHTML = '';
};


const checkSettings = options => {
  for (const option of options) {
    if (option.checked) {
      return option.value;
    }
  }
};

const hideCards = () => {
  const cards = document.querySelectorAll('.card--is-visible');
  for (const c of cards) {
    c.classList.remove('card--is-visible');
    visibleCards = 0;
  }
};


const cardCounter = c => {
  visibleCards += parseInt(c);
  console.log(`cartas visibles: ${visibleCards}`);
}


const checkVisiblePair = () => {
  console.log('comprobando parejas');
};


const playCard = e => {
  const card = e.currentTarget;

  if (card.classList.contains('card--is-visible')) {
    card.classList.remove('card--is-visible');
    cardCounter(-1);
  } else {
    if (visibleCards === maxVisibleCards) {
      hideCards();
    }
    card.classList.add('card--is-visible');
    cardCounter(1);
  }

  if (visibleCards === maxVisibleCards) {
    checkVisiblePair();
  }

}

const initGame = (data) => {
  for (const card of data) {
    const cardListItem = document.createElement('li');
    cardListItem.className = 'pairs__card';

    const cardItem = document.createElement('div');
    cardItem.className = 'card';
    cardItem.addEventListener('click', playCard);

    const cardFront = document.createElement('div');
    cardFront.className = 'card__side card__side--front';

    const cardFrontContent = document.createElement('img');
    cardFrontContent.className = 'card__side-item';
    cardFrontContent.src=card.image;
    cardFront.appendChild(cardFrontContent);

    const cardBack = document.createElement('div');
    cardBack.className = 'card__side card__side--back';

    const cardBackContent = document.createElement('img');
    cardBackContent.className = 'card__side-item';
    cardBackContent.src='https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
    cardBack.appendChild(cardBackContent);

    cardItem.append(cardFront, cardBack);
    cardListItem.appendChild(cardItem);
    cards.appendChild(cardListItem);

  }
};


const beginGame = () => {
  resetGame();
  const cardsURL = 'https://raw.githubusercontent.com/Adalab/cards-data/master/' + checkSettings(settings) + '.json';

  fetch(cardsURL)
    .then(response => {
      return response.json();
    })
    .then(gameData => {
      initGame(gameData);
    });
};

goBTN.addEventListener('click', beginGame);




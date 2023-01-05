'use strict';

//selecting elements

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnRules = document.querySelector('.btn--rules');

function switchPlayer() {
    activePlayer = (activePlayer === 0) ? 1 : 0;

    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}


//#game begins

//game status
let playing = true;
//initial setting
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

function initialSetting() {
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceEl.classList.add('hidden');

}

//setting current active score to zero
function setCurrent0() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
}

// initialSetting();

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        //Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        if (dice !== 1) {
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }
        else {
            setCurrent0();
            //Switching to next player
            switchPlayer();

        }
    }
});

//hold button functionality
btnHold.addEventListener('click', function () {
    if (playing) {
        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //Setting current score to zero
        setCurrent0();

        //?Check if player has >==100 points
        if (scores[activePlayer] >= 50) {
            //Finish the game
            console.log(scores[activePlayer]);
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('.player--active');

            //ending the game
            playing = false;

            //hiding the dice
            diceEl.classList.add('hidden');
        }
        else {
            //switching player
            switchPlayer();
        }
    }
});

//New game button functionality
btnNew.addEventListener('click', function () {
    console.log(scores[activePlayer]);
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');

    initialSetting();
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector(`.player--0`).classList.add('player--active');

    playing = true;
});

//# Rules Modal window
btnRules.addEventListener('click', function () {
    document.querySelector('.modal').classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');
});

function hideModal() {
    document.querySelector('.modal').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
}

//close rules modal
const btnCloseRules = document.querySelector('.close--modal');

btnCloseRules.addEventListener('click', hideModal);

document.querySelector('.overlay').addEventListener('click', hideModal);


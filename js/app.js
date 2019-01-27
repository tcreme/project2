/*
 * Create a list that holds all of your cards
 */
//Global variables
let deckOfCards = ['fa fa-diamond','fa fa-diamond','fa fa-paper-plane-o','fa fa-paper-plane-o',
              'fa fa-anchor','fa fa-anchor','fa fa-bolt','fa fa-bolt','fa fa-cube','fa fa-cube',
              'fa fa-leaf','fa fa-leaf','fa fa-bicycle','fa fa-bicycle','fa fa-bomb','fa fa-bomb'];
let matchedCards = 0;
let moveCounter = 0;
let starCounter = 3;
let time = 0;
let timer;
let gameTimerDOM = document.querySelector('.gameTimer');
let modalContentDOM = document.querySelector('.modalContent');
let modalDOM = document.querySelector('.modal');


function printCardHTML(card) {
  return `<li class="card"><i class="${card}"></i></li>`
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


//links deck to deck class then calls shuffle function
function createDeck() {
    let deckDOM = document.querySelector('.deck');

    shuffle(deckOfCards);

    let temp = '';
    let i = 0;
    let len = deckOfCards.length;
    for (; i < len; i++) {
      temp = temp + printCardHTML(deckOfCards[i]);
    }

    deckDOM.innerHTML = temp;
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


//Click funtion for initial click and assigns event listeners to each card
function clickCards(){
  let allCards = document.querySelectorAll('.card');
  let i, cardName;
  for (i = 0; i < allCards.length; i++) {
    allCards[i].setAttribute(cardName, deckOfCards[i]);
  }
  // To Read the card name use
  // allCards[i].getAttribute(cardName);
  let openCards = [];
  let initialClick = 0;

  // Add an event listener to each element of allCards
  // The function in forEach takes two parameters: the refernce to the value
  // stored in allCards[i] and the index i
  allCards.forEach(function(htmlText, arrayIndex){
    // The value sent from allCards[i] has an event listener to it that is
    // activated by clikcing. Clicking the card represented by htmlText will
    // write the index value to openCards, which will later be used to compare
    // if two selected cards are a match.
    console.log("forEach method called.")

    allCards[arrayIndex].addEventListener("click", function() {
      // If its the first card click, activate timer functionality

      if (initialClick == 0) {
        initialClick = 1;
        setTimer();
      }

      // Make sure the same card isn't being clicked twice
      if(arrayIndex == openCards[0]) return;
      console.log("arrayIndex = ", arrayIndex);

      // Add array number for card that has been clicked in openCards
      openCards.push(arrayIndex);

      // Check if there are too many cards open (timeout isn't over)
      if(openCards.length > 2) return;

      allCards[arrayIndex].classList.add('open', 'show');

      // clicked to compare cards.
      if(openCards.length >= 2) {
        moveCounter++;
        setMoves();
        setStars();

        // If two cards are open, compare their values. If they're a match,
        // update the CSS coresponding to their class 'match' and 'show'
        if(allCards[openCards[0]].firstChild.className == allCards[openCards[1]].firstChild.className) {

          // Match found

          allCards[openCards[0]].classList.remove('open');
          allCards[openCards[1]].classList.remove('open');
          allCards[openCards[0]].classList.add('match');
          allCards[openCards[1]].classList.add('match');
          // add to matimetchedCards for winning the game
          matchedCards++;

          // Clear the openCards array
          openCards = [];
        } else {
          // No match found. Reset the cards
          setTimeout(function() {
            allCards[openCards[0]].classList.remove('open','show');
            allCards[openCards[1]].classList.remove('open','show');

            // Clear the openCards array
            openCards = [];
          //seconds allowed for open cards
          },475);
        }
      }
    })
  });
}


// The start of players counter when two cards are clicked
function setTimer() {
  timer = setInterval(function() {
    time++;
    gameTimerDOM.innerHTML = `Timer: ${time} seconds`;

    // Have all cards been matched?
    if(matchedCards == 8) {
      congrats();
      clearInterval(timer);
    }
  }, 1000);
}


// Links moves class to the increment of moves in clicked cards function
function setMoves() {
let movesDOM = document.querySelector('.moves');
  if (moveCounter == 1) {
    movesDOM.innerHTML = `${moveCounter} Move`;
  } else {
    movesDOM.innerHTML = `${moveCounter} Moves`;
  }
}


// decreases the amount of stars depending on moveCounter
function setStars() {
let starsDOM = document.querySelector('.stars');
  if (moveCounter == 0) {
    starsDOM.innerHTML = `<li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>`;
    starCounter = 3;
  } else if (moveCounter == 14) {
    starsDOM.innerHTML = `<li><i class="fa fa-star"></i></li>
                          <li><i class="fa fa-star"></i></li>`;
    starCounter = 2;
  } else if (moveCounter == 22) {
    starsDOM.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    starCounter = 1;
  } else if (moveCounter == 30) {
    starsDOM.innerHTML = ``;
    starCounter = 0;
  }
}


//refreshes the game
function restartDeck() {
  let restartDOM = document.querySelector('.restart');
  restartDOM.addEventListener('click', function(){
    createDeck();
    matchedCards = 0;
    moveCounter = 0;
    setMoves();
    setStars();
    clearInterval(timer);
    time = 0;
    initiateTimer();
    clickCards();
  })
}


function initiateTimer() {
  gameTimerDOM.innerHTML = `Timer: 0 seconds`;
}


function congrats() {
    // Get the modal
    //let modalDOM = document.querySelector('.myModal');

    modalContentDOM.innerHTML =
      `<span class = "close">&times;</span>
      <p>Congratulations, you won!! Your time was ${time} seconds and you finished with
      ${starCounter} stars!</p> <button class="playAgainBtn"> Play Again </button>`;

    let closeDOM = document.querySelector('.close');
    let playAgainBtn = document.querySelector('.playAgainBtn');

    // When the user clicks on <span> (x), close the modal
    modalDOM.style.display = "block";

    playAgainBtn.addEventListener('click', function() {
      createDeck();
      matchedCards = 0;
      moveCounter = 0;
      setMoves();
      setStars();
      clearInterval(timer);
      time = 0;
      initiateTimer();
      clickCards();
      modalDOM.style.display = "none";
    });

    // When the user clicks on <span> (x), close the modal
    closeDOM.addEventListener('click', function(){
      modalDOM.style.display = "none";
    });
}


// Start Functions
createDeck();
setMoves();
setStars();
initiateTimer();
restartDeck();
clickCards();

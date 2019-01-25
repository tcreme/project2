/*
 * Create a list that holds all of your cards
 */
let deckOfCards = ['fa fa-diamond','fa fa-diamond','fa fa-paper-plane-o','fa fa-paper-plane-o',
              'fa fa-anchor','fa fa-anchor','fa fa-bolt','fa fa-bolt','fa fa-cube','fa fa-cube',
              'fa fa-leaf','fa fa-leaf','fa fa-bicycle','fa fa-bicycle','fa fa-bomb','fa fa-bomb'];

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

function createDeck() {
    let deckDOM = document.querySelector('.deck');

// shuffleDeck();

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

 createDeck();
 //clickCards();

 //1. click cards
 //2. if clicked, rename class to '.card .show'? -> .className ='card show'
 //3. compare last two clicked cards. if their type (card name) is the same
   //in matchedCards and change .className = 'card matched'
//function clickCards(){
  let allCards = document.querySelectorAll('.card');
  let i, cardName;
  for (i = 0; i < allCards.length; i++) {
    allCards[i].setAttribute(cardName, deckOfCards[i]);
  }
  // To Read the card name use
  // allCards[i].getAttribute(cardName);
  let openCards = [];
  let matchedCards = [];



  // Add an event listener to each element of allCards
  // The function in forEach takes two parameters: the refernce to the value
  // stored in allCards[i] and the index i
  allCards.forEach(function(htmlText, arrayIndex){
    // The value sent from allCards[i] has an event listener to it that is
    // activated by clikcing. Clicking the card represented by htmlText will
    // write the index value to openCards, which will later be used to compare
    // if two selected cards are a match.
    console.log("forEach method called.")

    allCards[arrayIndex].addEventListener("click", function(){
      // Make sure the same card isn't being clicked twice
      if(arrayIndex == openCards[0]) return;
      console.log("arrayIndex = ", arrayIndex);

      // Add array number for card that has been clicked in openCards
      openCards.push(arrayIndex);

      // Check if we have too many cards open (timeout isn't over)
      if(openCards.length > 2) return;

      allCards[arrayIndex].classList.add('open', 'show');

      // Check the size of openCards to determine if enough cards have between
      // clicked to compare cards.
      if(openCards.length >= 2){
        // If two cards are open, compare their values. If they're a match,
        // update the CSS coresponding to their class 'match' and 'show'
        if(allCards[openCards[0]].firstChild.className == allCards[openCards[1]].firstChild.className){
          // Match found
          console.log("We have a match!");
          allCards[openCards[0]].classList.remove('open');
          allCards[openCards[1]].classList.remove('open');
          allCards[openCards[0]].classList.add('match');
          allCards[openCards[1]].classList.add('match');

          // Clear the openCards array
          openCards = [];
        }else{
          // No match found. Reset the cards
          setTimeout(function() {
            allCards[openCards[0]].classList.remove('open','show');
            allCards[openCards[1]].classList.remove('open','show');

            // Clear the openCards array
            openCards = [];
          },475);

        }
      }
    })
  });

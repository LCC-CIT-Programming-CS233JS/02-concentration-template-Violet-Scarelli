class Concentration
{
    /*
        Add a constructor.  In the body of the constructor
        -   Create instance variables to replace the global variables
        -   Bind the class to each of the following methods
        -       this.showMatches = this.showMatches.bind(this);
        -       this.enableAllCards = this.enableAllCards.bind(this);
        -       this.enableAllRemainingCards = this.enableAllRemainingCards.bind(this);
        -       this.checkCards = this.checkCards.bind(this);
        -       this.disableAllCards = this.disableAllCards.bind(this);
        -       this.isMatch = this.isMatch.bind(this);     
        -   All of the functionality of init will happen in the constructor ... call init.
    */
    constructor(imagePath, images, firstPick, secondPick, matches, tries)
    {
        // let imagePath = 'Cards/';
        // let images = Array(19).fill(null);
        // let firstPick = -1;
        // let secondPick = -1;
        // let matches = 0;
        // let tries = 0;
        this.imagePath = imagePath;
        this.images = images;
        this.firstPick = firstPick;
        this.secondPick = secondPick;
        this.matches = matches;
        this.tries = tries;
        this.showMatches = this.showMatches.bind(this);
        this.enableAllCards = this.enableAllCards.bind(this);
        this.enableAllRemainingCards = this.enableAllRemainingCards.bind(this);
        this.checkCards = this.checkCards.bind(this);
        this.disableAllCards = this.disableAllCards.bind(this);
        this.isMatch = this.isMatch.bind(this);
        this.init();   
    }
    
    /*
        Convert each function to a method.  
        -   Move it inside the class.
        -   Remove the keyword function
        -   Add this. in front of every variable and method
        
        THREE OF THE METHODS CHANGE A LITTLE
        -   handleClick will now have a parameter, index
            -   remove the declaration / assignment of the local var index
        -   enableAllCards (and enableAllRemainingCards) have to pass the index to handleClick
            -   the line of code that calls bind must now pass both this and an index
            -   before: cards[i].onclick = this.handleClick.bind(this);
            -   should be: cards[i].onclick = this.handleClick.bind(this, i);
    */
    init()
    {
        this.fillImages();
        this.shuffleImages();
        this.showMatches();
        this.enableAllRemainingCards();
        this.showAllBacks();
    }

    showMatches() {
        document.getElementById("status").innerHTML = "Matches: " + this.matches;
    }

    fillImages() {
        let values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
        let suits = ['h', 's'];
        let index = 0;
        for (let i = 0; i < values.length; i++){
            for (let j = 0; j < suits.length; j++)
            {
                this.images[index] = "card" + values[i] + suits[j] + ".jpg";
                index++;
            }
        }
    }

    shuffleImages() {
        for (let i = 0; i < this.images.length; i++){
            let rndIndex = Math.floor(Math.random() * 19);
            let temp = this.images[i];
            this.images[i] = this.images[rndIndex];
            this.images[rndIndex] = temp;
        }
    }

    enableAllCards() {
        let cards = document.getElementsByName("card");
        for (let i = 0; i < cards.length; i++){
            cards[i].onclick = this.handleClick.bind(this, i);
            cards[i].style.cursor = 'pointer';
        }
    
    }

    enableAllRemainingCards() {
        let cards = document.getElementsByName("card");
        for (let i = 0; i < cards.length; i++){
            if (cards[i].style.backgroundImage != 'none'){
                cards[i].onclick = this.handleClick.bind(this, i);
                cards[i].style.cursor = 'pointer';
            }
        }
    }

    showBack(index) {
        // create a variable card and set it equal to the ui element with an id of index
        // set the style.backgroundImage of card to the filename for the back of a card
        let card = document.getElementById(index);
        card.style.backgroundImage = 'url("' + this.imagePath + 'black_back.jpg")';
    }

    showAllBacks() {
        // create a loop that iterates through indices 0 to 19
            // call the function showBack for the current index
        // end for loop
        for (let i = 0; i <= 19; i++){
            this.showBack(i);
        }
    }

    handleClick(index) {
        let cardImage = this.images[index];
        let card = document.getElementById(index);
        card.style.backgroundImage = 'url(' + this.imagePath + cardImage + ')';
        this.disableCard(index);
        if(this.firstPick == -1){
            this.firstPick = index;
        }
        else{
            this.secondPick = index;
            this.disableAllCards();
            setTimeout(this.checkCards, 2000);
        }
    }

    disableCard(index) {
        let card = document.getElementById(index);
        card.onclick = () => {}; 
        card.style.cursor = 'none';
    }

    disableAllCards() {
        let cards = document.getElementsByName("card")
        for (let i = 0; i < cards.length; i++){
            let card = document.getElementById(i);
            card.onclick = () => {};
            card.style.cursor = 'none';
        }
    }

    checkCards() {
        this.tries++;
        if (this.isMatch(this.firstPick, this.secondPick)){
            this.matches++;
            this.removeCard(this.firstPick);
            this.removeCard(this.secondPick);
            if (this.matches < 10){
                this.enableAllRemainingCards();
            }
        }
        else{
            this.showBack(this.firstPick);
            this.showBack(this.secondPick);
            this.enableAllRemainingCards();
        }
        this.showMatches();
        this.firstPick = -1;
        this.secondPick = -1;
    }

    isMatch(first, second) {
        let firstMatch = this.images[first];
        let secondMatch = this.images[second];
        if (firstMatch.charAt(4) == secondMatch.charAt(4)){
            return true;
        }
        else{
            return false;
        }
    }

    removeCard(index) {
        let card = document.getElementById(index);
        card.style.backgroundImage = 'none'
    }
}

// create a variable called concentration
// Add an event handler to the load event of the window. 
// Use an anonymous function or an arrow function to
// set the concentration variable to an instance of Concentration

var concentration;
addEventListener("load", (event) => {concentration = new Concentration('Cards/', Array(19).fill(null), -1, -1, 0, 0)})

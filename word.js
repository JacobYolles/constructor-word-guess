// Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the 
// current word the user is attempting to guess. That means the constructor should define:


// An array of new Letter objects representing the letters of the underlying word
// A function that returns a string representing the word. This should call the function on each letter object
//  (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
// A function that takes a character as an argument and calls the guess function on each letter object (the second function defined 
// in Letter.js)

// Importing letter.js since it is a reliant file for this file.
var Letter = require("./Letter");
// create the word constructor:
var Word = function(myWord) {
    //have it take the word from the word list!
    this.myWord = myWord;
    // create the array of letters representing the random word.
    this.letters = [];
    // create the underscores to put on the word based on the amount of letters in the word.
    this.underscores = [];

    this.splitWord = function() {
        this.letters = this.myWord.split("")
        // console.log(this.letters)

        // create the ability to determine the amount of underscores needed
        numberUnderscoresNeeded = this.letters.length

        console.log(this.underscores.join(""))
    }
    this.generateLetters = function() {
        for (i = 0; i < this.letters.length; i++) {
            this.letters[i] = new Letter (this.letters[i]);

            this.letters[i].showCharacter();
        }


    }
}

module.exports = Word
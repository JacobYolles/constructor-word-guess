// Allows the file to require the word.js file.
var Word = require("./Word.js");
// Let the game have access to the inquirer package.
var inquirer = require("inquirer");
// giving the game some color using this package.
var clc = require('cli-color');
//ability to convert text to drawing
var figlet = require('figlet');
// npm package for letter/word validation.
var isLetter = require('is-letter');
// create boxes inside of the terminal 
const boxen = require('boxen');
// give a green color for correct guesses based on the CLC package.
var correct = clc.green.bold;
// give a red color for incorrect guesses based on the CLC package.
var incorrect = clc.red.bold;
// give the base text of the game a teal color based on the CLC package.
var gameTextColor = clc.cyanBright;

// create a variable for if the user guesses correctly.
var userGuessedCorrectly = false;
// Initially set to false this allows boolean flagging to change this to true.
// Creates the word bank, the pre deterimined list of words that will be picked from for the user to guess at trying to solve.
var wordList = ["red", "blue", "green", "violet", "purple", "indigo", "yellow", "orange", "maroon", "cyan", "aquamarine"]

// Create the ability for the word to be chosen from the random word list.
var randomWord; 
var someWord;

// Create the counters for wins, losses, and guesses remaining.
var wins = 0;
var losses = 0;
var guessesRemaining = 20;

// Create a variable for the base guess of the user into the inquirer prompt.
var userGuess = "";

//Create similar variables for that which has already been guessed during the game.
var lettersAlreadyGuessedList = "";
var lettersAlreadyGuessedListArray = [];

// Number of slots to fill in with underscore values, when the game either starts or resets, this is set to 0.
var slotsFilledIn = 0;

// Create the logic to make the game run!

figlet("Hangman Game", function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    //Welcome screen text.
    console.log(gameTextColor("Welcome to my Hangman Game!"));
    console.log(gameTextColor("The theme of the game will be colors!"));
    //Game instructions.
    var howToPlay = 
    "==========================================================================================================" + "\r\n" +
    "How to play" + "\r\n" +
    "==========================================================================================================" + "\r\n" +
    "When prompted to enter a letter, press any letter (a-z) on the keyboard to guess a letter." + "\r\n" +
    "Keep guessing letters. When you guess a letter, your choice will either be correct or incorrect." + "\r\n" +
    "If your guess is incorrect, the letter you guessed is not part of the word you are trying to solve." + "\r\n" + 
    "For every incorrect guess, the number of guesses you have remaining decrease by 1." + "\r\n" +
    "If your guess is correct, the letter you guessed is part of the word you are trying to solve!" + "\r\n" +
    "If you correctly guess all the letters in the word before the number of guesses remaining reaches 0," + "\r\n" +
    "You win!! After you have won, the game will reset and you may guess more colors!" + "\r\n" +
    "If you run out of guesses before the entire word is revealed, you lose. Game over." + "\r\n" +
    "===========================================================================================================" + "\r\n" +
    "You can exit the game at any time by pressing Ctrl + C on your keyboard." + "\r\n" +
    "===========================================================================================================" 
    console.log(gameTextColor(howToPlay));
 	//Ask user if they are ready to play.
    confirmStart();
});

//Use Inquirer package to display game confirmation prompt to user.
function confirmStart() {
	var readyToStartGame = [
	 {
	 	type: 'text',
	 	name: 'playerName',
	 	message: 'What is your name?'
	 },
	 {
	    type: 'confirm',
	    name: 'readyToPlay',
	    message: 'Are you ready to play?',
	    default: true
	  }
	];

	inquirer.prompt(readyToStartGame).then(answers => {
		//If the user confirms that they want to play, start game.
		if (answers.readyToPlay){
			console.log(gameTextColor("Great! Welcome, " + answers.playerName + ". Let's begin..."));
			startGame();
		}

		else {
			//If the user decides they don't want to play, exit game.
			console.log(gameTextColor("Good bye, " + answers.playerName + "! Come back soon."));
			return;
		}
	});
}
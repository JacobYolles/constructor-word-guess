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
var wordList = ["red", "blue", "green", "violet", "purple", "indigo", "yellow", "orange", "maroon", "cyan", "aquamarine"];

// Create the ability for the word to be chosen from the random word list.
var randomWord;
var someWord;

// Create the counters for wins, losses, and guesses remaining.
var wins = 0;
var losses = 0;
var guessesRemaining = 10;

// Create a variable for the base guess of the user into the inquirer prompt.
var userGuess = "";

//Create similar variables for that which has already been guessed during the game.
var lettersAlreadyGuessedList = "";
var lettersAlreadyGuessedListArray = [];

// Number of slots to fill in with underscore values, when the game either starts or resets, this is set to 0.
var slotsFilledIn = 0;

// Create the logic to make the game run!



figlet("Hangman Game", function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)

    figlet("     Theme: Colors", function (err, data) {
        if (err) {
            console.log("Something went wrong...");
            console.dir(err);
            return;
        }
        console.log(data)
    })
    //Welcome screen text.
    console.log(gameTextColor("Welcome to my Hangman Game!"));
    console.log(gameTextColor("The theme of the game will be colors!"));
    //Game instructions.
    var howToPlay =
        "==========================================================================================================" + "\r\n" +
        "How to play:" + "\r\n" +
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
        if (answers.readyToPlay) {
            console.log(gameTextColor("Great! Welcome, " + answers.playerName + ". Let's begin!"));
            startGame();
        }

        else {
            //If the user decides they don't want to play, exit game.
            console.log(gameTextColor("Good bye, " + answers.playerName + "! Come back soon!"));
            return;
        }
    });
}

// create the functionality to allow the game to start.
function startGame() {
    // allow the user 10 remaining guesses to get to the right answer.
    guessesRemaining = 10;
    // have the system pick a random word from the word list.
    chooseRandomWord();
    // When the game is started we clear each list.
    lettersAlreadyGuessedList = "";
    lettersAlreadyGuessedListArray = [];
}

// create the ability to generate the random word from the random word list variable.
function chooseRandomWord() {
    // this creates the functionality for the random word to work
    randomWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
    // this creates the ability for the random word chosen from the list to become some word.
    someWord = new Word(randomWord);
    // create the ability for the user to know what it is that they are shooting for.
    console.log(gameTextColor("The word you are guessing contains " + randomWord.length + " letters"));
    console.log(gameTextColor("WORD TO GUESS: "));

    // someWord.splitWord();
    // someWord.generateLetters();
    guessLetter();
}

// Create functionality to prompt the user to guess a letter.
function guessLetter() {
    //create functionality to prompt the user to guess letters so long as there are underscores remaining, or if their are still guesses remaining.
    if (slotsFilledIn < someWord.letters.length || guessesRemaining > 0) {
        inquirer.prompt([
            {
                name: "letter",
                message: "Guess a Letter!",

                validate: function (value) {
                    if (isLetter(value)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        ]).then(function(guess) {
            // convert all the letters that the user has guessed to uppercase.
            guess.letter.toUpperCase();
            console.log(gameTextColor("You guessed: " + guess.letter.toUpperCase()));
            // make it so that the system believes that the correct guess is false at this point.
            userGuessedCorrectly = false;
            // create functionality to see if the letter was already guessed by the user, and if so prompt them to search for another letter.
            if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) > -1) {
                //If user already guessed a letter, run inquirer again to prompt them to enter a different letter.
                console.log(gameTextColor("You already guessed that letter. Enter another one."));
                console.log(gameTextColor("====================================================================="));
                guessLetter();
            }
            else if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) === -1) {
                //Add letter to list of already guessed letters.
                lettersAlreadyGuessedList = lettersAlreadyGuessedList.concat(" " + guess.letter.toUpperCase());
                lettersAlreadyGuessedListArray.push(guess.letter.toUpperCase());
                //Show letters already guessed to user.
                console.log(boxen(gameTextColor('Letters already guessed: ') + lettersAlreadyGuessedList, { padding: 1 }));

                //We need to loop through all of the letters in the word, 
                //and determine if the letter that the user guessed matches one of the letters in the word.
                for (i = 0; i < someWord.letters.length; i++) {
                    //If the user guess equals one of the letters/characters in the word and letterGuessedCorrectly is equal to false for that letter...
                    if (guess.letter.toUpperCase() === someWord.letters[i].character && someWord.letters[i].letterGuessedCorrectly === false) {
                        //Set letterGuessedCorrectly property for that letter equal to true.
                        someWord.letters[i].letterGuessedCorrectly === true;
                        //Set userGuessedCorrectly to true.
                        userGuessedCorrectly = true;
                        someWord.underscores[i] = guess.letter.toUpperCase();
                        // someWord.underscores.join("");
                        // console.log(someWord.underscores);
                        //Increment the number of slots/underscores filled in with letters by 1.
                        slotsFilledIn++
                        //console.log("Number of slots remaining " + slotsFilledIn);
                    }
                }
                console.log(gameTextColor("WORD TO GUESS:"));
                someWord.splitWord();
                someWord.generateLetters();

                //If user guessed correctly...
                if (userGuessedCorrectly) {
                    //Tell user they are CORRECT (letter is in the word they are trying to guess.)
                    console.log(correct('CORRECT!'));
                    console.log(gameTextColor("====================================================================="));
                    //After each letter guess, check if the user won or lost.
                    checkIfUserWon();
                }

                //Else if user guessed incorrectly...
                else {
                    //Tell user they are INCORRECT (letter is not in the word).
                    console.log(incorrect('INCORRECT!'));
                    //Decrease number of guesses remaining by 1 and display number of guesses remaining.
                    guessesRemaining--;
                    console.log(gameTextColor("You have " + guessesRemaining + " guesses left."));
                    console.log(gameTextColor("====================================================================="));
                    //After each letter guess, check if the user won or lost.
                    checkIfUserWon();
                }
            }
        });
    }
}

// create functionality to check whether or not the user has won or not after the guessing of every letter.
function checkIfUserWon() {
    // if the number of guesses remaining is equal to 0, than the user has lost and the game ends.
    if (guessesRemaining === 0) {
        // create messages that inform the user that they have lost.
        console.log(gameTextColor("====================================================================="));
		console.log(incorrect('YOU LOST. BETTER LUCK NEXT TIME.'));
        console.log(gameTextColor("The correct colour was: " + randomWord));
        //Increment loss counter by 1.
		losses++;
		//Display wins and losses totals.
		console.log(gameTextColor("Wins: " + wins));
		console.log(gameTextColor("Losses: " + losses));
		console.log(gameTextColor("====================================================================="));
		//Ask user if they want to play again. Call playAgain function.
		playAgain();
    }
    // create an else if condition.
    else if (slotsFilledIn === someWord.letters.length) {
		console.log(gameTextColor("====================================================================="));
		console.log(correct("YOU WON! YOU REALLY KNOW YOUR COLOURS!"));
		//Increment win counter by 1.
		wins++;
		//Show total wins and losses.
		console.log(gameTextColor("Wins: " + wins));
		console.log(gameTextColor("Losses: " + losses));
		console.log(gameTextColor("====================================================================="));
		//Ask user if they want to play again. Call playAgain function.
		playAgain();
	}
 // create an else condition to allow the user to continue playing the game.
	else {
		//If user did not win or lose after a guess, keep running inquirer.
		guessLetter("");
	}
}

// create the functionality to query whether or not the user would like to play the game again.
function playAgain() {
	var playGameAgain = [
	 {
	    type: 'confirm',
	    name: 'playAgain',
	    message: 'Do you want to play again?',
	    default: true
	  }
	];

	inquirer.prompt(playGameAgain).then(userWantsTo => {
		if (userWantsTo.playAgain){
			//Empty out the array that contains the letters already guessed.
			lettersAlreadyGuessedList = "";
			lettersAlreadyGuessedListArray = [];
			//Set number of slots filled in with letters back to zero.
			slotsFilledIn = 0;
			console.log(gameTextColor("Great! Welcome back. Let's begin..."));
			//start a new game.
			startGame();
		}

		else {
			//If user doesn't want to play again, exit game.
			console.log(gameTextColor("Good bye! Come back soon."));
			return;
		}
	});
}

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

// Creates the word bank, the pre deterimined list of words that will be picked from for the user to guess at trying to solve.
var wordList = ["red", "blue", "green", "violet", "purple", "indigo", "yellow", "orange", "maroon", "cyan", "aquamarine"]

// Create the ability for the word to be chosen from the random word list.
var randomWord; 
var someWord;

// Create the counters for wins, losses, and guesses remaining.
var wins = 0;
var losses = 0;
var guessesRemaining = 20;
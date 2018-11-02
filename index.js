// Allows the file to require the word.js file.
var Word = require("./Word.js");
// Let the game have access to the inquirer package.
var inquirer = require("inquirer");
// giving the game some color using this package.
var clc = require('cli-color');

// Creates the word bank, the pre deterimined list of words that will be picked from for the user to guess at trying to solve.
var wordList = ["red", "blue", "green", "violet", "purple", "indigo", "yellow", "orange", "maroon", "cyan", "aquamarine"]

// Create the ability for the word to be chosen from the random word list.
var randomWord; 
var someWord;

// Create the counters for wins, losses, and guesses remaining.
var wins = 0;
var losses = 0;
var guessesRemaining = 20;
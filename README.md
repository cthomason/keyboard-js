# keyboard-js

## Challenge
The challenge is to find a shortest path on a virtual keyboard to spell out a word.
* The input will be an array of JSON objects containing: an ordered alphabet, a row length, a starting focused key, and a word to spell. (Example below)
  * There may be multiple JSON objects in the file. The program should run for each.
* You may expect all characters in the input string to be a subset of the keyboard alphabet.
* The keyboard will contain only unique characters and is case sensitive.
* The keyboard rows are left justified (see example below)
* Moving past the edge of the keyboard will wrap the “focused key” to the opposite side of the same row/column. Bottom wraps to top, left wraps to right.
  * Having a single character in a row or column should wrap back to itself
* You can only move to adjacent buttons, you can not move diagonally
* The output will be an array of objects containing the distance and array of strings which represent the motions taken to type the word.
  * p - press the focused key (does not count towards distance)
  * u - move the focus up one key
  * d - move the focus down one key
  * l - move the focus left one key
  * r - move the focus right one key

## Example

Where inputFile.json contains:
```javascript
[{
    "alphabet":["Q", "W", "E", "R", "T", "Y", "U", "I", "B", "P", "A", "S"],
    "rowLength": 5,
    "startingFocus": "B",
    "word": "BAR"
}, {
    "alphabet":["R", "T", "Y", "A", "S", "D", "E", "U", "I", "O", "L"],
    "rowLength": 3,
    "startingFocus": "Y",
    "word": "TILT"
}]
```

The program would generate the following output:
```javascript
[{
    "alphabet":["Q", "W", "E", "R", "T", "Y", "U", "I", "B", "P", "A", "S"],
    "rowLength": 5,
    "startingFocus": "B",
    "word": "BAR",
    "distance": 6,
    "path": ["p", "r", "r", "d", "p", "d", "l", "l", "p"]
}, {
    "alphabet":["R", "T", "Y", "A", "S", "D", "E", "U", "I", "O", "L"],
    "rowLength": 3,
    "startingFocus": "Y",
    "word": "TILT",
    "distance": 6,
    "path": ["l", "p", "r", "u", "p", "l", "d", "p", "d", "p"]
}]
```

## Instructions

This submisstion has been written in javascript intended for the NodeJS
environment.

1. Clone the repo
2. Make sure that inputFile.json in the appropriate format is present in the
same directory.  The format was specified in the original document.  A sample
file has been included.
3. Run `node main.js` from the terminal.

The output will be written to the terminal upon completion.
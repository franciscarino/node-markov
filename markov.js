"use strict";
/** Textual markov chain generator. */

class MarkovMachine {
  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    let wordMap = new Map();

    // loop over words and make key in map or push to key array
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1];

      if (nextWord === undefined) {
        nextWord = null;
      }

      if (wordMap.has(word)) {
        //push next word onto key
        wordMap.get(word).push(nextWord);
      } else {
        wordMap.set(word, [nextWord]);
      }
    }
    return wordMap;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    let sentence = this.words[0];
    let currentWord = this.words[0];

    while (currentWord !== null) {
      let wordArray = this.chains.get(currentWord);
      let idx = Math.floor(Math.random() * wordArray.length);

      // avoid adding "null" to sentence.
      if (wordArray[idx] !== null) {
        sentence += ` ${wordArray[idx]}`;
      }

      //set next word to current word
      currentWord = wordArray[idx];
    }
    return sentence;
  }
}


module.exports = { MarkovMachine };
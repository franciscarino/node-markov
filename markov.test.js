"use strict";

const { MarkovMachine } = require("./markov.js");

describe("test markov machine", function () {

    let testText;

    beforeAll(function () {
        testText = new MarkovMachine('The cat is in the hat. The cat is the cat. The hat is a cat.');
    });

    test("test getChains", function () {
      let chains = testText.getChains();
      expect(chains.get('The')).toContain('cat');
    });


    test("test getText", function () {
      let generatedText = testText.getText();
      expect(generatedText[generatedText.length-1]).toEqual('.');
    });


    //iterate through entire string using similar structure:
    
    test("test getText", function () {
    // generate a string of text based on Markov chain:
      let generatedText = testText.getText();
    // split text into array of words:
      let arrayOfGeneratedText = generatedText.split(' ');
    // pick a word past index 0:
      let originalValue = arrayOfGeneratedText[2];
    // find word before to find original key from Map:
      let originalKey = testText.chains.get(arrayOfGeneratedText[1]);

      expect(originalKey).toContain(originalValue);
    });
  
});
import {
  isLetterCharacter,
  isMarkCharacter,
  isNumberCharacter,
  isOtherCharacter,
  isPunctuationCharacter,
  isSeparatorCharacter,
  isSymbolCharacter,
} from "../utils/string";

/**
 * Flattens down consecutive character repetition.
 * @param input
 */
function unRepeatifyCharacters(input: string) {
  const chars = input.split("");
  let lastChar = "";
  let occurrence = 0;

  const output = [];

  for (const char of chars) {
    if (char !== lastChar) {
      occurrence = 0;
      output.push(char);
    }

    if (char === lastChar) {
      occurrence++;
      if (
        (isLetterCharacter(char) && occurrence >= 2) ||
        (isNumberCharacter(char) && occurrence >= 4) ||
        (isPunctuationCharacter(char) && occurrence >= 1) ||
        (isMarkCharacter(char) && occurrence >= 1) ||
        (isSymbolCharacter(char) && occurrence >= 2) ||
        (isSeparatorCharacter(char) && occurrence >= 1) ||
        (isOtherCharacter(char) && occurrence >= 1)
      ) {
        continue;
      } else {
        output.push(char);
      }
    }
    lastChar = char;
  }

  return output.join("");
}

class Word {
  input: string;
  output: string;

  constructor(word: string) {
    this.input = word;

    this.output = unRepeatifyCharacters(word);
  }

  toString() {
    return this.output;
  }

  get source() {
    return this.input;
  }
}

class MessageStructure {
  source: string;
  input: string;

  words: Word[];

  constructor(message: string) {
    this.source = message;
    this.input = message.toLocaleLowerCase();

    this.words = this.input.split(" ").map((c) => new Word(c));
  }

  toString() {
    return this.words.join(" ");
  }
}

export function parseMessage(message: string) {
  return new MessageStructure(message).toString();
}

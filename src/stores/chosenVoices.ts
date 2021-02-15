import { get, readable, writable } from "svelte/store";
import { simplex } from "../services/procGen";
import { split } from "../utils/string";
import { availableVoices, getVoiceReference } from "./availableVoices";

const synth = window.speechSynthesis;

interface ChosenVoiceSettings {
  uri: string;
  pitchMin: number;
  pitchMax: number;
  rateMin: number;
  rateMax: number;
}

export const chosenVoices = writable<ChosenVoiceSettings[]>(
  JSON.parse(localStorage.getItem("TTTS.ChosenVoices")) || []
);

chosenVoices.subscribe((voices) => {
  localStorage.setItem("TTTS.ChosenVoices", JSON.stringify(voices));
});

export function playMessage(
  message: string,
  voiceURI?: string,
  pitch = 1,
  rate = 1
) {
  if (synth.speaking) {
    synth.cancel();
  }

  const utterThis = new SpeechSynthesisUtterance(message);

  utterThis.pitch = pitch;
  utterThis.rate = rate;
  if (voiceURI) {
    utterThis.voice = getVoiceReference(voiceURI);
  }

  utterThis.onerror = function (event) {
    console.error(
      "An error has occurred with the speech synthesis: " + event.error
    );
  };
  utterThis.onboundary = function (event) {
    console.log(
      event.name +
        " boundary reached after " +
        event.elapsedTime +
        " milliseconds."
    );
  };
  utterThis.onend = function (event) {
    console.log(
      "Utterance has finished being spoken after " +
        event.elapsedTime +
        " milliseconds."
    );
  };
  utterThis.onmark = function (event) {
    console.log("A mark was reached: " + event.name);
  };
  utterThis.onpause = function (event) {
    console.log("Speech paused after " + event.elapsedTime + " milliseconds.");
  };
  utterThis.onresume = function (event) {
    console.log("Speech resumed after " + event.elapsedTime + " milliseconds.");
  };
  utterThis.onstart = function (event) {
    console.log(
      "We have started uttering this speech: " + event.utterance.text
    );
  };

  synth.speak(utterThis);

  return utterThis;
}

/**
 * Procedurally generates pitch, rate and voice for the username.
 * The resulting voice will stay consistent throughout.
 */
export function playChatMessage(userName: string, message: string) {
  const voices = get(chosenVoices);
  const utterThis = new SpeechSynthesisUtterance(message);

  const rndNumbers = split(userName, 5).map((c) => c.codePointAt(0));

  const voiceProc = simplex.noise2D(rndNumbers[0], rndNumbers[4]) / 2 + 0.5;
  const pitchProc = simplex.noise2D(rndNumbers[0], rndNumbers[1]) / 2 + 0.5;
  const rateProc = simplex.noise2D(rndNumbers[2], rndNumbers[3]) / 2 + 0.5;

  const voiceIndex = voiceProc * (voices.length - 1);

  // pickedVoice
  const { uri, pitchMax, pitchMin, rateMax, rateMin } = voices[voiceIndex];

  utterThis.voice = getVoiceReference(uri);
  utterThis.pitch = pitchProc * (pitchMax - pitchMin) + pitchMin;
  utterThis.rate = rateProc * (rateMax - rateMin) + rateMin;

  synth.speak(utterThis);
}

import { get, readable } from "svelte/store";

const synth = window.speechSynthesis;

export const availableVoices = readable<SpeechSynthesisVoice[]>(
  [],
  function start(set) {
    function voicesChanged() {
      set(synth.getVoices());
    }

    synth.addEventListener("voiceschanged", voicesChanged);

    return function stop() {
      synth.removeEventListener("voiceschanged", voicesChanged);
    };
  }
);

export function getVoiceReference(voiceURI: string) {
  return get(availableVoices).find((v) => v.voiceURI === voiceURI);
}

// let voices: SpeechSynthesisVoice[];
// synth.addEventListener("voiceschanged", () => {
//   voices = synth.getVoices();
// });

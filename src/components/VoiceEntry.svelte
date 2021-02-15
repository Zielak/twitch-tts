<script lang="ts">
  import { getRandomMessage } from "../services/randomMessages";

  import { chosenVoices, playMessage } from "../stores/chosenVoices";
  import { middle } from "../utils/number";
  import VoiceSettings from "./VoiceSettings.svelte";
  import VoiceStartError from "./VoiceStartError.svelte";

  export let def: boolean;
  export let lang: string;
  export let localService: boolean;
  export let name: string;
  export let voiceURI: string;

  const rememberedVoice = $chosenVoices.find((voice) => voice.uri === voiceURI);

  // Initial values
  let enabled: boolean = !!rememberedVoice;
  let pitchMin = rememberedVoice?.pitchMin || 0;
  let pitchMax = rememberedVoice?.pitchMax || 2;
  let rateMin = rememberedVoice?.rateMin || 1;
  let rateMax = rememberedVoice?.rateMax || 10;

  /**
   * Current voice configuration failed to start
   */
  let failedToStart: boolean = false;

  function getVoiceData() {
    return { pitchMin, pitchMax, rateMin, rateMax, uri: voiceURI };
  }

  function handleEnabledChange() {
    const voice = $chosenVoices.findIndex((voice) => voice.uri === voiceURI);

    if (voice >= 0) {
      $chosenVoices = [...$chosenVoices.filter((v) => v.uri !== voiceURI)];
    } else {
      $chosenVoices = [...$chosenVoices, getVoiceData()];
    }
  }

  let settingsOpened = false;

  function handleSettingsClick() {
    settingsOpened = !settingsOpened;
  }

  /**
   * Settings - onInput - update values
   */
  function onPitchMinInput(value: number) {
    pitchMin = value;
    if (pitchMin > pitchMax) {
      pitchMax = pitchMin;
    }
  }
  function onPitchMaxInput(value: number) {
    pitchMax = value;
    if (pitchMax < pitchMin) {
      pitchMin = pitchMax;
    }
  }
  function onRateMinInput(value: number) {
    rateMin = value;
    if (rateMin > rateMax) {
      rateMax = rateMin;
    }
  }
  function onRateMaxInput(value: number) {
    rateMax = value;
    if (rateMax < rateMin) {
      rateMin = rateMax;
    }
  }
  /**
   * Settings - onChange - save to storage, and play test message
   */
  function onPitchMinChange() {
    const utterance = playMessage(
      getRandomMessage(),
      voiceURI,
      pitchMin,
      middle(rateMin, rateMax)
    );
    watchUtterance(utterance);

    saveSettings();
  }
  function onPitchMaxChange() {
    const utterance = playMessage(
      getRandomMessage(),
      voiceURI,
      pitchMax,
      middle(rateMin, rateMax)
    );
    watchUtterance(utterance);

    saveSettings();
  }
  function onRateMinChange() {
    const utterance = playMessage(
      getRandomMessage(),
      voiceURI,
      middle(pitchMin, pitchMax),
      rateMin
    );
    watchUtterance(utterance);

    saveSettings();
  }
  function onRateMaxChange() {
    const utterance = playMessage(
      getRandomMessage(),
      voiceURI,
      middle(pitchMin, pitchMax),
      rateMax
    );
    watchUtterance(utterance);

    saveSettings();
  }

  function saveSettings() {
    $chosenVoices = [
      ...$chosenVoices.map((v) => (v.uri === voiceURI ? getVoiceData() : v)),
    ];
  }

  /**
   * Ensure the utterance plays. Some voices may have difference rate/pitch
   * limitations, which can prevent the voice from playing at all.
   * @param utterance
   */
  function watchUtterance(utterance: SpeechSynthesisUtterance) {
    failedToStart = false;

    function gotFail() {
      cleanup();
      failedToStart = true;
    }

    function cleanup() {
      utterance.removeEventListener("start", gotStart);
      utterance.removeEventListener("error", gotFail);
      clearTimeout(timeout);
    }

    function gotStart() {
      cleanup();
      failedToStart = false;
    }

    const timeout = setTimeout(gotFail, 2000);

    utterance.addEventListener("start", gotStart);
    utterance.addEventListener("error", gotFail);
  }
</script>

<section
  class={[
    "VoiceEntry",
    enabled && "VoiceEntry--enabled",
    failedToStart && "VoiceEntry--failed",
  ]
    .filter((v) => v)
    .join(" ")}
>
  <div class="VoiceEntry__infoRow">
    <div class="VoiceEntry__infoCell">
      <label class="VoiceEntry__name" for={voiceURI}>
        <input
          id={voiceURI}
          type="checkbox"
          bind:checked={enabled}
          on:change={handleEnabledChange}
        />
        {name}
      </label>
      <code class="VoiceEntry__tag">{voiceURI}</code>

      {#if def}
        <code class="VoiceEntry__tag">System default</code>
      {/if}
    </div>
    <div class="VoiceEntry__langCell">
      {lang}
    </div>
    <div class="VoiceEntry__serviceCell">
      {#if localService}
        <figure
          class="VoiceEntry__serviceIcon"
          title="Locally installed service"
        >
          💻
        </figure>
      {:else}
        <figure class="VoiceEntry__serviceIcon" title="Remote voice service">
          🌐
        </figure>
      {/if}
    </div>
    <div class="VoiceEntry__settingsCell">
      <button
        class="VoiceEntry__settingsButton"
        on:click={handleSettingsClick}
        disabled={!enabled}
        title={!enabled ? "Enable this voice first" : ""}>⚙️</button
      >
    </div>
  </div>

  {#if failedToStart}
    <VoiceStartError onDismiss={() => (failedToStart = false)} />
  {/if}

  {#if settingsOpened && enabled}
    <VoiceSettings
      initialPitchMin={pitchMin}
      initialPitchMax={pitchMax}
      initialRateMin={rateMin}
      initialRateMax={rateMax}
      {onPitchMinChange}
      {onPitchMinInput}
      {onPitchMaxChange}
      {onPitchMaxInput}
      {onRateMinChange}
      {onRateMinInput}
      {onRateMaxChange}
      {onRateMaxInput}
    />
  {/if}
</section>

<style>
  .VoiceEntry {
    border-bottom: 1px solid #efefef;
  }

  .VoiceEntry__infoRow {
    display: flex;
    margin: 0.5em 0;
  }
  .VoiceEntry__infoRow > div:not(:last-child):not(:first-child) {
    margin-right: 1em;
  }
  .VoiceEntry__infoRow .VoiceEntry__infoCell {
    margin-right: auto;
  }

  .VoiceEntry.failed {
    background: #ff9999;
  }

  .VoiceEntry__name {
    cursor: pointer;
  }
  .VoiceEntry--enabled .VoiceEntry__name {
    font-weight: bold;
  }

  .VoiceEntry__serviceIcon {
    margin: 0;
    cursor: help;
  }

  .VoiceEntry:not(.VoiceEntry--enabled) .VoiceEntry__settingsButton {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .VoiceEntry__tag {
    background: #ddd;
    padding: 0.1em 0.3em;
    border-radius: 0.3em;
  }
</style>

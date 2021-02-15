<script type="ts">
  export let initialPitchMin: number;
  export let initialPitchMax: number;
  export let initialRateMin: number;
  export let initialRateMax: number;

  export let onPitchMinChange: (value: number) => void;
  export let onPitchMinInput: (value: number) => void;
  export let onPitchMaxChange: (value: number) => void;
  export let onPitchMaxInput: (value: number) => void;
  export let onRateMinChange: (value: number) => void;
  export let onRateMinInput: (value: number) => void;
  export let onRateMaxChange: (value: number) => void;
  export let onRateMaxInput: (value: number) => void;

  $: pitchMin = initialPitchMin;
  $: pitchMax = -initialPitchMax;
  $: rateMin = initialRateMin;
  $: rateMax = -initialRateMax;
</script>

<div class="VoiceSettings">
  <div class="VoiceSettings__sliders">
    <span>Pitch ({pitchMin} - {-pitchMax})</span>
    <input
      class="VoiceSettings__range"
      bind:value={pitchMin}
      on:input={() => onPitchMinInput(pitchMin)}
      on:change={() => onPitchMinChange(pitchMin)}
      type="range"
      min="0.05"
      max="2"
      step="0.05"
    />
    <input
      class="VoiceSettings__range VoiceSettings__range--inputMax"
      bind:value={pitchMax}
      on:input={() => onPitchMaxInput(-pitchMax)}
      on:change={() => onPitchMaxChange(-pitchMax)}
      type="range"
      min="-2"
      max="-0.05"
      step="0.05"
    />
  </div>
  <div class="VoiceSettings__sliders">
    {#if rateMin <= 0.4}
      <strong
        class="VoiceSettings__warning"
        title="Minimum value is extremly low, in busy chats voices may become incomprehensible."
        >Rate ({rateMin} - {-rateMax})</strong
      >
    {:else}
      <span>Rate ({rateMin} - {-rateMax})</span>
    {/if}
    <input
      class="VoiceSettings__range"
      bind:value={rateMin}
      on:input={() => onRateMinInput(rateMin)}
      on:change={() => onRateMinChange(rateMin)}
      type="range"
      min="0.1"
      max="10"
      step="0.05"
    />
    <input
      class="VoiceSettings__range VoiceSettings__range--inputMax"
      bind:value={rateMax}
      on:input={() => onRateMaxInput(-rateMax)}
      on:change={() => onRateMaxChange(-rateMax)}
      type="range"
      min="-10"
      max="-0.1"
      step="0.05"
    />
  </div>
</div>

<style>
  .VoiceSettings {
    display: flex;
    text-align: center;
    flex-direction: column;
    margin: 0.5em 0;
  }
  .VoiceSettings__sliders {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  @media (min-width: 480px) {
    .VoiceSettings {
      flex-direction: row;
    }
    .VoiceSettings__sliders {
      width: 100%;
    }
  }

  input[type="range"] {
    margin: 0 0 -0.5em 0;
  }
  .VoiceSettings__warning {
    cursor: help;
    background: #ffff66;
  }

  .VoiceSettings__range {
    width: 100%;
  }
  .VoiceSettings__range--inputMax {
    transform: rotate(180deg);
  }
</style>

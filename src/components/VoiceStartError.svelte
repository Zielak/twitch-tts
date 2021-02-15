<script lang="ts">
  export let onDismiss: () => void;
</script>

<p class="VoiceStartError">
  Current configuration failed to play for some reason.<br />
  Maybe lower the max rate?
  <button on:click={onDismiss}>dismiss</button>
</p>

<style>
  .VoiceStartError {
    text-align: center;
    margin: 0.5em 0;
    padding: 0.5em;
    background: #ffcccc;
    border: red 1px solid;
    border-radius: 0.4em;
  }
</style>

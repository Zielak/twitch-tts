<script lang="ts">
  import { availableVoices } from "../stores/availableVoices";
  import VoiceEntry from "./VoiceEntry.svelte";
</script>

<h2>Available voices</h2>
{#each $availableVoices as v}
  <VoiceEntry
    def={v.default}
    lang={v.lang}
    localService={v.localService}
    name={v.name}
    voiceURI={v.voiceURI}
  />
{/each}

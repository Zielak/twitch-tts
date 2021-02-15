<script lang="ts">
  import { parseMessage } from "../services/antiGriefer";

  let inputText: string = "";
  $: outputText = parseMessage(inputText);
</script>

<h2>Chat tester</h2>
<section>
  <input class="ChatTester__input" type="text" bind:value={inputText} />
  <p class="ChatTester__output">{outputText}</p>
</section>

<style>
  .ChatTester__input {
    width: 100%;
  }
  .ChatTester__output {
  }
</style>

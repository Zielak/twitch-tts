<script lang="ts">
  import ChatTester from "./components/ChatTester.svelte";
  import VoicesList from "./components/VoicesList.svelte";

  const supported = "speechSynthesis" in window;
</script>

<main>
  <header>
    {#if !supported}
      <h1>speechSynthesis API not supported!</h1>
      <p>Try it in a different browser.</p>
    {:else}
      <h1>speechSynthesis API supported!</h1>
    {/if}
  </header>

  <article>
    <ChatTester />
  </article>

  <article>
    <TodoNote />
  </article>

  <article>
    <VoicesList />
  </article>
</main>

<style>
  main {
    margin: 0 auto;
  }
  @media (min-width: 640px) {
    main {
      max-width: 640px;
    }
  }
  header {
    text-align: center;
    padding: 1em;
    margin: 0;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }
</style>

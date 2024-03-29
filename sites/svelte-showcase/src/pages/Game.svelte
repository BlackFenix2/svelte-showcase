<script lang="ts">
  import { Container, Button } from 'sveltestrap';
  import CelebCard from 'src/components/modules/CelebCard.svelte';
  import { sleep, pickRandom, loadImage } from 'src/utils';
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { fly, scale, crossfade } from 'svelte/transition';
  import * as eases from 'svelte/easing';
  import { cameoparisonStore } from 'src/state/cameoparison';
  export let selection: object[] = [];

  const [send, receive] = crossfade({
    duration: 300,
    easing: eases.cubicInOut,
    fallback: null,
  });

  let i = 0;
  let lastResult: 'right' | 'wrong';
  let done = false;
  let ready = true;
  let inputLocked = false;

  $: score = results.filter((x) => x === 'right').length;

  const findCheater = (e: Event) => {
    e.preventDefault();
    console.log('cheating caught from event: ', e.type);
    cameoparisonStore.cheatingDetected();
    return false;
  };

  const pickMessage = (p) => {
    if (p < 0.5) return pickRandom(['Ouch', 'Must try harder']);
    if (p < 0.8) return pickRandom(['Not bad', 'Keep practicing!']);
    if (p < 1) return pickRandom(['So close', 'Almost There!']);
    return pickRandom(['You rock!', 'Flawless victory!']);
  };

  const loadDetails = async (celeb) => {
    const res = await fetch(
      `https://cameo-explorer.netlify.app/celebs/${celeb.id}.json`
    );
    const details = await res.json();
    await loadImage(details.image);
    return details;
  };

  const promises = selection.map((round: any) =>
    Promise.all([loadDetails(round.a), loadDetails(round.b)])
  );

  const results = Array(selection.length);
  const submit = async (a, b, sign) => {
    //lock input once a selection was made, allow the animation to play.
    if (inputLocked) {
    } else {
      inputLocked = true;
      lastResult = Math.sign(a.price - b.price) === sign ? 'right' : 'wrong';

      await sleep(1500);

      results[i] = lastResult;
      lastResult = null;

      await sleep(500);
      if (i < selection.length - 1) {
        i += 1;
      } else {
        done = true;
      }
      inputLocked = false;
    }
  };
</script>

<style lang="scss">
  p {
    max-width: 24em;
    margin: 0 auto 1em auto;
    text-align: center;
  }

  .game {
    display: grid;
    width: 100%;
    max-width: unquote('min(100%, 40vh)');
    height: 100%;
    margin: 0 auto;
    grid-gap: 0.5em;
    grid-template-rows: 1fr 2em 1fr;
    > div {
      display: flex;
      align-items: center;
    }
  }

  .game-container {
    flex: 1;
  }
  .giant-result {
    position: fixed;
    top: calc(50vh - 25vmin);
    left: calc(50vw - 25vmin);
    width: 50vmin;
    height: 50vmin;
    opacity: 0.5;
  }

  .overlay {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .card-container {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  .results {
    display: grid;
    width: 100%;
    max-width: 320px;
    margin: 1em auto 0 auto;
    grid-gap: 0.2em;
  }
  .result {
    position: relative;
    padding: 0 0 100% 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transition: background 0.2s;
    transition-delay: 0.2s;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .done {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    strong {
      font-size: 6em;
      font-weight: 700;
    }
  }

  @media (min-width: 640px) {
    .game {
      max-width: 100%;
      max-height: calc(100vh - 6em);
      grid-template-columns: 1fr 8em 1fr;
      grid-template-rows: none;
    }
  }
</style>

<svelte:window on:blur={findCheater} />

<template>
  <div
    class="overlay bg-dark text-white d-flex flex-column justify-content-center
    m-auto">
    <p>
      Tap on the more monetisable celebrity's face, or tap 'same price' if
      society values them equally.
    </p>

    <div class="game-container container">
      {#if done}
        <div
          class="done"
          in:scale={{ delay: 200, duration: 800, easing: eases.elasticOut }}>
          <strong>{score}/{results.length}</strong>
          <p>{pickMessage(score / results.length)}</p>
          <Button
            color="primary"
            on:click={() => {
              cameoparisonStore.reset();
            }}>
            Back to main screen
          </Button>
        </div>
      {:else if ready}
        {#await promises[i] then [a, b]}
          <div
            class="game"
            in:fly={{ duration: 200, y: 20 }}
            out:fly={{ duration: 200, y: -20 }}
            on:outrostart={() => (ready = false)}
            on:outroend={() => (ready = true)}>
            <div class="card-container">
              <CelebCard
                celeb={a}
                showPrice={!!lastResult}
                winner={a.price >= b.price}
                on:select={() => {
                  submit(a, b, 1);
                }} />
            </div>
            <div>
              <Button
                block
                color="primary"
                on:click={() => {
                  submit(a, b, 0);
                }}>
                Same Price
              </Button>
            </div>
            <div class="card-container">
              <CelebCard
                celeb={b}
                showPrice={!!lastResult}
                winner={b.price >= a.price}
                on:select={() => {
                  submit(a, b, -1);
                }} />
            </div>
          </div>

        {:catch}
          <p class="text-danger">oops, faild to load data</p>
        {/await}
      {/if}

    </div>

    {#if lastResult}
      <img
        in:fly={{ x: 100, duration: 200 }}
        out:send={{ key: i }}
        class="giant-result"
        alt="{lastResult} answer"
        src="/icons/{lastResult}.svg" />
    {/if}
    <div
      class="results"
      style="grid-template-columns: repeat({results.length}, 1fr);">
      {#each results as result, i}
        <span class="result">
          {#if result}
            <img
              in:receive={{ key: i }}
              alt="{result} answer"
              src="/icons/{result}.svg" />
          {/if}
        </span>
      {/each}
    </div>
  </div>

</template>

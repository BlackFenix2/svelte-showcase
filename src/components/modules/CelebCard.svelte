<script lang="ts">
  import { Button } from 'sveltestrap';
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { scale } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import { cameoparisonStore } from 'src/state/cameoparison';
  export let celeb;

  export let showPrice;
  export let winner;

  const dispatch = createEventDispatcher();

  const cheater = (e: MouseEvent) => {
    cameoparisonStore.cheatingDetected();
  };
</script>

<style lang="scss">
  a {
    color: #7fdbff;
  }
  h2 {
    margin: 0 0 0.2em 0;
  }

  button {
    border: none;
    border-radius: 5px;
  }
  .card-outer {
    height: 100%;
    width: 100%;
    padding: 0 0 50% 0;
    position: relative;
  }

  .card-inner {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: 50% 50% no-repeat;
    background-position: 50% 0;
    background-size: cover;
    overflow: hidden;
    padding: 0;
    text-align: left;
    border-radius: 5px;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
  }
  .details {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 1em 0.5em 0.5em 0.5em;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(0, 0, 0, 0.6) 35%,
      rgba(0, 0, 0, 0.9)
    );
    color: white;
  }

  .type {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4em;
    font-weight: 700;
  }

  .large {
    font-size: 4em;
  }

  @media (min-width: 640px) {
    .card-outer {
      height: 0;
      padding: 0 0 100% 0;
    }
  }
</style>

<template>
  <div class="card-outer">
    <button
      class="card-inner"
      style="background-image: url({celeb.image})"
      on:click={() => dispatch('select')}>
      <div class="details">
        <h2>
          <a
            target="_blank"
            href="https://cameo.com/{celeb.id}"
            on:auxclick={cheater}>
            {celeb.name}
          </a>
        </h2>
        <p class="type text-white">{celeb.type}</p>
      </div>
      {#if showPrice}
        <div class="price" class:large={winner}>
          <span in:scale={{ easing: elasticOut, duration: 600 }}>
            ${celeb.price}
          </span>

        </div>
      {/if}
    </button>
  </div>
</template>

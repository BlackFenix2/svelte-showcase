<script lang="ts">
  import { Button } from 'sveltestrap';
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { scale } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';

  export let celeb;

  export let showPrice;
  export let winner;

  const dispatch = createEventDispatcher();
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
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 0 50% 0;
  }

  .card-inner {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 0;
    background: 50% 50% no-repeat;
    background-position: 50% 0;
    background-size: cover;
    border-radius: 5px;
    box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);
    text-align: left;
  }
  .details {
    position: absolute;
    bottom: 0;
    width: 100%;
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
    overflow: hidden;
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .price {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
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
          <a target="_blank" href="https://cameo.com/{celeb.id}">
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

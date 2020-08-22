<script lang="ts">
  export let text = '';

  export let rounded: boolean = false;
  export let circle: boolean = false;

  let buttonElement: HTMLElement;
  let spanElement: HTMLElement;

  let mouseX: number;
  let mouseY: number;

  function clickEvent(e: MouseEvent) {
    var { left, top } = buttonElement.getBoundingClientRect();
    mouseX = e.clientX - left;
    mouseY = e.clientY - top;
    spanElement.style.left = `${mouseX}px`;
    spanElement.style.top = `${mouseY}px`;
  }
</script>

<style lang="scss">
  button {
    position: relative;
    overflow: hidden;
    padding: 8px 16px;
    border: solid thin black;
    background-color: inherit;
    color: black;
    cursor: pointer;
    font-size: inherit;
    outline: none;
    transition: all 0.3s;

    &:hover {
      background-color: lightgrey;
    }

    & > span {
      position: absolute;
      display: none;
      width: 100px;
      height: 100px;
      margin-top: -50px;
      margin-left: -50px;
      animation: ripple 1s;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      content: '';
      opacity: 0;
      transition: background-color 0.3s;
    }

    &:focus:not(:active) span {
      display: block;
    }
  }

  @keyframes ripple {
    from {
      opacity: 1;
      transform: scale(0);
    }

    to {
      opacity: 0;
      transform: scale(10);
    }
  }

  .rounded {
    border-radius: 5px;
  }

  .circle {
    padding: 8px;
    border-radius: 50%;
  }
</style>

<template>
  <button
    class:rounded
    class:circle
    on:click={clickEvent}
    bind:this={buttonElement}>
    <slot />
    {text}
    <span class="active" bind:this={spanElement} />
  </button>
</template>

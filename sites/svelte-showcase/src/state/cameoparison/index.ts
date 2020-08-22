import { writable } from 'svelte/store';

interface State {
  cheatingDetected: boolean;
  gameStarted: boolean;
  cheatCount: number;
}

const initialState: State = {
  cheatingDetected: false,
  gameStarted: false,
  cheatCount: 0,
};

function createCameoparison() {
  const { subscribe, set, update } = writable<State>(initialState);

  return {
    subscribe,
    cheatingDetected: () =>
      update((c) => {
        const count = parseInt(localStorage.cheatCount) || 0;

        console.log('cheating count: ', count);
        localStorage.cheatCount = count + 1;
        return { ...c, cheatingDetected: true, cheatCount: count + 1 };
      }),
    startGame: () =>
      update((c) => {
        return { ...c, gameStarted: true };
      }),
    reset: () => set(initialState),
  };
}

export const cameoparisonStore = createCameoparison();

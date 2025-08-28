export function test() {
  return "test";
}

export function createNonRepeatingRandomizer<T>(items: T[]): () => T | undefined {
  let shuffled: T[] = [];
  let index = 0;

  function shuffle(array: T[]) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  return () => {
    if (index === 0 || index >= shuffled.length) {
      shuffled = shuffle(items);
      index = 0;
    }
    return shuffled[index++];
  };
}
/**
 * Ensure there is some seed in storage.
 * Don't regenerate if there is.
 */
export function initSeed(): string {
  const seed = getSeed();

  if (!seed || seed !== seed) {
    return regenerateSeed();
  } else {
    return seed;
  }
}

export function regenerateSeed(): string {
  const seed = Math.random().toString();
  localStorage.setItem("TTTS.seed", seed);

  return seed;
}

export function getSeed(): string {
  return localStorage.getItem("TTTS.seed");
}

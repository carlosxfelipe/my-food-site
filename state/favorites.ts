import { computed, effect, signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

type FavMap = Record<string, true>;

const STORAGE_KEY = "favorites:ids";

function load(): FavMap {
  if (!IS_BROWSER) return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const arr: string[] = JSON.parse(raw);
    return arr.reduce<FavMap>((acc, id) => {
      acc[id] = true;
      return acc;
    }, {});
  } catch {
    return {};
  }
}

export const fav = signal<FavMap>(load());

export function toggle(id: string) {
  const next = { ...fav.value };
  if (next[id]) delete next[id];
  else next[id] = true;
  fav.value = next;
}

export const has = (id: string) => Boolean(fav.value[id]);

export const ids = computed(() => Object.keys(fav.value));

export const count = computed(() => ids.value.length);

// persiste em localStorage
if (IS_BROWSER) {
  effect(() => {
    try {
      const arr = Object.keys(fav.value);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
    } catch {}
  });
}

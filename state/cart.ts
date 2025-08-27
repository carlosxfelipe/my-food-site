import { computed, effect, signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

type QtyMap = Record<string, number>;

const STORAGE_KEY = "cart:qty";

function load(): QtyMap {
  if (!IS_BROWSER) return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export const qty = signal<QtyMap>(load());

export function add(id: string, max: number = Infinity) {
  qty.value = { ...qty.value, [id]: Math.min((qty.value[id] ?? 0) + 1, max) };
}
export function inc(id: string, max: number = Infinity) {
  add(id, max);
}
export function dec(id: string) {
  const next = { ...qty.value };
  const cur = (next[id] ?? 0) - 1;
  if (cur <= 0) delete next[id];
  else next[id] = cur;
  qty.value = next;
}
export function clear() {
  qty.value = {};
}

export const count = computed(() =>
  Object.values(qty.value).reduce((a, b) => a + b, 0)
);

// persiste em localStorage
if (IS_BROWSER) {
  effect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(qty.value));
    } catch {}
  });
}

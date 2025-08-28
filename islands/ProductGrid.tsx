import ProductCard from "../components/ProductCard.tsx";
import type { Product } from "../data/products.ts";
import { dec, inc, qty } from "../state/cart.ts";
import { useMemo } from "preact/hooks";
import type { JSX } from "preact";
import { formatBRL } from "../utils/currency.ts";

type Props = {
  products: Product[];
  minColWidth?: number;
  gap?: number;
};

export default function ProductGrid(
  { products, minColWidth = 180, gap = 12 }: Props,
) {
  const subtotal = useMemo(() => {
    const map = qty.value;
    return products.reduce(
      (acc, p) => acc + Number(p.price) * Number(map[p.id] ?? 0),
      0,
    );
  }, [products, qty.value]);

  const gridStyle: JSX.CSSProperties = {
    display: "grid",
    gap: `${gap}px`,
    gridTemplateColumns: `repeat(auto-fit, minmax(${minColWidth}px, 1fr))`,
  };

  const containerClass =
    "flex flex-col gap-4 pb-[calc(env(safe-area-inset-bottom)+92px)] md:pb-0";

  const subtotalBarClass =
    "sticky bottom-[calc(env(safe-area-inset-bottom)+80px)] md:bottom-3 mx-1 md:mx-0 rounded-xl px-4 py-5 border " +
    "bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur " +
    "border-outline-light/40 dark:border-outline-dark/40 " +
    "flex items-center justify-between";

  return (
    <div class={containerClass}>
      <div style={gridStyle} class="grid justify-items-center">
        {products.map((p) => {
          const q = qty.value[p.id] ?? 0;
          return (
            <ProductCard
              key={p.id}
              product={p}
              quantity={q}
              onAdd={() => inc(p.id, p.stock)}
              onIncrease={() => inc(p.id, p.stock)}
              onDecrease={() => dec(p.id)}
            />
          );
        })}
      </div>

      <div
        class={`hidden md:flex ${subtotalBarClass}`}
        aria-label={`Subtotal ${formatBRL(subtotal)}`}
      >
        <div class="flex items-center gap-2">
          <i class="mdi mdi-cart-outline text-xl text-onSurface-light dark:text-onSurface-dark" />
          <span class="font-semibold text-onSurface-light dark:text-onSurface-dark">
            Subtotal
          </span>
        </div>
        <span class="text-lg font-extrabold text-onSurface-light dark:text-onSurface-dark">
          {formatBRL(subtotal)}
        </span>
      </div>

      <div
        class="md:hidden mx-2 mt-4 space-y-3"
        aria-label="Resumo do carrinho"
      >
        <div class="flex items-center justify-between rounded-xl px-4 py-3 border bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur border-outline-light/40 dark:border-outline-dark/40">
          <span class="font-semibold text-onSurface-light dark:text-onSurface-dark">
            Subtotal
          </span>
          <span class="text-lg font-extrabold text-onSurface-light dark:text-onSurface-dark">
            {formatBRL(subtotal)}
          </span>
        </div>

        <a
          href="/orders"
          class="w-full block text-center px-4 py-3 rounded-lg font-semibold bg-primary-light text-onPrimary-light dark:bg-primary-dark dark:text-onPrimary-dark hover:opacity-90"
        >
          Ver carrinho
        </a>
      </div>
    </div>
  );
}

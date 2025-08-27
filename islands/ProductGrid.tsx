import ProductCard from "../components/ProductCard.tsx";
import type { Product } from "../data/products.ts";
import { dec, inc, qty } from "../state/cart.ts";
import { useMemo } from "preact/hooks";
import type { JSX } from "preact";

type Props = { products: Product[]; columns?: number; gap?: number };

export default function ProductGrid(
  { products, columns = 2, gap = 12 }: Props,
) {
  const subtotal = useMemo(() => {
    const map = qty.value;
    return products.reduce((acc, p) => acc + p.price * (map[p.id] ?? 0), 0);
  }, [products, qty.value]);

  const gridStyle: JSX.CSSProperties = {
    display: "grid",
    gap: `${gap}px`,
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  };

  const containerClass =
    "flex flex-col gap-4 pb-[calc(env(safe-area-inset-bottom)+92px)] md:pb-0";

  const subtotalBarClass =
    "sticky bottom-[calc(env(safe-area-inset-bottom)+80px)] md:bottom-3 mx-1 md:mx-0 rounded-xl px-4 py-5 border " +
    "bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur " +
    "border-outline-light/40 dark:border-outline-dark/40 " +
    "flex items-center justify-between";

  const subtotalWrapperClass = "flex items-center gap-2";

  const subtotalIconClass =
    "mdi mdi-cart-outline text-xl text-onSurface-light dark:text-onSurface-dark";

  const subtotalLabelClass =
    "font-semibold text-onSurface-light dark:text-onSurface-dark";

  const subtotalValueClass =
    "text-lg font-extrabold text-onSurface-light dark:text-onSurface-dark";

  return (
    <div class={containerClass}>
      <div style={gridStyle}>
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
              class="h-full"
            />
          );
        })}
      </div>

      <div
        class={subtotalBarClass}
        aria-label={`Subtotal ${
          new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
            .format(subtotal)
        }`}
      >
        <div class={subtotalWrapperClass}>
          <i class={subtotalIconClass} />
          <span class={subtotalLabelClass}>Subtotal</span>
        </div>
        <span class={subtotalValueClass}>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(subtotal)}
        </span>
      </div>
    </div>
  );
}

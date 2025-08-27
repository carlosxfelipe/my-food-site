import { useMemo, useState } from "preact/hooks";
import ProductCard from "../components/ProductCard.tsx";
import type { Product } from "../data/products.ts";

type Props = {
  products: Product[];
  columns?: number;
  gap?: number; // em px
};

export default function ProductGrid(
  { products, columns = 2, gap = 12 }: Props,
) {
  // estado simples de quantidades por id
  const [qty, setQty] = useState<Record<string, number>>({});

  const inc = (id: string, max?: number) =>
    setQty((m) => ({
      ...m,
      [id]: Math.min((m[id] ?? 0) + 1, max ?? Infinity),
    }));
  const dec = (id: string) =>
    setQty((m) => {
      const next = { ...m };
      const cur = (next[id] ?? 0) - 1;
      if (cur <= 0) delete next[id];
      else next[id] = cur;
      return next;
    });

  const subtotal = useMemo(
    () => products.reduce((acc, p) => acc + p.price * (qty[p.id] ?? 0), 0),
    [products, qty],
  );

  // grid responsivo simples
  const gridStyle = {
    display: "grid",
    gap: `${gap}px`,
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
  } as const;

  return (
    <div class="flex flex-col gap-4">
      <div style={gridStyle as any}>
        {products.map((p) => {
          const q = qty[p.id] ?? 0;
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

      {/* barra de subtotal */}
      <div
        class="sticky bottom-3 mx-1 md:mx-0 rounded-xl px-4 py-3 border
          bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur
          border-outline-light/40 dark:border-outline-dark/40
          flex items-center justify-between"
        aria-label={`Subtotal ${
          new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
            .format(subtotal)
        }`}
      >
        <div class="flex items-center gap-2">
          <i class="mdi mdi-cart-outline text-xl
            text-onSurface-light dark:text-onSurface-dark" />
          <span class="font-semibold text-onSurface-light dark:text-onSurface-dark">
            Subtotal
          </span>
        </div>
        <span class="text-lg font-extrabold text-onSurface-light dark:text-onSurface-dark">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(subtotal)}
        </span>
      </div>
    </div>
  );
}

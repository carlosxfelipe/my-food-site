import ProductCard from "../components/ProductCard.tsx";
import ProductCardSkeleton from "../components/ProductCardSkeleton.tsx";
import type { Product } from "../data/products.ts";
import { qty } from "../state/cart.ts";
import { useEffect, useMemo, useState } from "preact/hooks";
import type { JSX } from "preact";
import { formatBRL } from "../utils/currency.ts";

type Props = {
  products: Product[];
  minColWidth?: number;
  gap?: number;
  isLoading?: boolean;
  skeletonCount?: number;
  initialLoading?: boolean;
};

export default function ProductGrid(
  {
    products,
    minColWidth = 180,
    gap = 12,
    isLoading: forcedLoading,
    skeletonCount = 16,
    initialLoading = false,
  }: Props,
) {
  const [hydrating, setHydrating] = useState(initialLoading);
  useEffect(() => {
    if (!initialLoading) return;
    const t = setTimeout(() => setHydrating(false), 300);
    return () => clearTimeout(t);
  }, [initialLoading]);

  const isLoading = typeof forcedLoading === "boolean"
    ? forcedLoading
    : hydrating;

  const subtotal = useMemo(() => {
    if (isLoading) return 0;
    const map = qty.value;
    return products.reduce(
      (acc, p) => acc + Number(p.price) * Number(map[p.id] ?? 0),
      0,
    );
  }, [products, qty.value, isLoading]);

  const gridStyle: JSX.CSSProperties = {
    display: "grid",
    gap: `${gap}px`,
    gridTemplateColumns: `repeat(auto-fit, minmax(${minColWidth}px, 1fr))`,
  };

  const containerClass =
    "flex flex-col gap-4 pb-[calc(env(safe-area-inset-bottom)+92px)] md:pb-0";

  const subtotalBarClass =
    "sticky z-30 bottom-[calc(env(safe-area-inset-bottom)+80px)] md:bottom-3 mx-1 md:mx-0 rounded-xl px-4 py-5 border " +
    "bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur " +
    "border-outline-light/40 dark:border-outline-dark/40 " +
    "flex items-center justify-between";

  const list = isLoading ? Array.from({ length: skeletonCount }) : products;

  return (
    <div class={containerClass} aria-busy={isLoading ? "true" : undefined}>
      <div style={gridStyle} class="grid justify-items-center">
        {isLoading
          ? list.map((_, i) => <ProductCardSkeleton key={`sk-${i}`} />)
          : products.map((p) => <ProductCard key={p.id} product={p} />)}
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
          {isLoading ? "—" : formatBRL(subtotal)}
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
            {isLoading ? "—" : formatBRL(subtotal)}
          </span>
        </div>

        <a
          href="/orders"
          class="w-full block text-center px-4 py-3 rounded-lg font-semibold bg-primary-light text-onPrimary-light dark:bg-primary-dark dark:text-onPrimary-dark hover:opacity-90"
          aria-disabled={isLoading ? "true" : undefined}
        >
          Ver carrinho
        </a>
      </div>
    </div>
  );
}

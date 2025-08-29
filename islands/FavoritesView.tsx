import { MOCK_PRODUCTS } from "../data/products.ts";
import ProductCard from "../components/ProductCard.tsx";
import { dec, inc, qty } from "../state/cart.ts";
import { fav, ids as favIds, toggle as toggleFav } from "../state/favorites.ts";
import Icon from "../components/Icon.tsx";
import { LinkButton } from "../components/LinkButton.tsx";

export default function FavoritesView() {
  const ids = new Set(favIds.value);
  const products = MOCK_PRODUCTS.filter((p) => ids.has(p.id));

  if (products.length === 0) {
    return (
      <div class="min-h-[60vh] grid place-items-center">
        <div class="text-center max-w-sm mx-auto">
          <Icon
            name="heart-off"
            size={56}
            class="mx-auto text-outline-light dark:text-outline-dark"
          />
          <h2 class="text-2xl font-bold mt-2 text-onSurface-light dark:text-onSurface-dark">
            Nada por aqui ainda
          </h2>
          <p class="mt-2 text-onSurface-light/80 dark:text-onSurface-dark/80">
            Toque no coração de um produto para favoritá-lo.
          </p>
          <LinkButton href="/" text="Explorar produtos" class="mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div
      class="grid gap-3 justify-items-center"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
    >
      {products.map((p) => {
        const q = qty.value[p.id] ?? 0;
        const isFavorite = Boolean(fav.value[p.id]);
        return (
          <ProductCard
            key={p.id}
            product={p}
            quantity={q}
            onAdd={() => inc(p.id, p.stock)}
            onIncrease={() => inc(p.id, p.stock)}
            onDecrease={() => dec(p.id)}
            isFavorite={isFavorite}
            onToggleFavorite={() => toggleFav(p.id)}
          />
        );
      })}
    </div>
  );
}

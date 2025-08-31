import Icon from "./Icon.tsx";
import type { Product } from "../data/products.ts";
import { formatBRL } from "../utils/currency.ts";
import QuantityControls from "../islands/QuantityControls.tsx";

type Props = {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onClick?: () => void;
  class?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
};

function withWidth(url: string, w: number) {
  if (/([?&])w=\d+/.test(url)) return url.replace(/([?&])w=\d+/, `$1w=${w}`);
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}w=${w}`;
}

export default function ProductCard({
  product,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
  onClick,
  class: cls = "",
  isFavorite,
  onToggleFavorite,
}: Props) {
  const outOfStock = product.stock === 0;
  const fullStars = Math.floor(product.rating ?? 0);
  const hasHalf = (product.rating ?? 0) - fullStars >= 0.5;
  const srcSet = [360, 540, 720, 960].map((w) =>
    `${withWidth(product.image, w)} ${w}w`
  ).join(", ");

  return (
    <div
      class={`group w-full max-w-[380px] rounded-xl overflow-hidden border transition
    bg-surface-light dark:bg-surface-dark
    border-outline-light/40 dark:border-outline-dark/40
    flex flex-col h-full
    ${cls}`}
      role={onClick ? "button" : undefined}
      onClick={onClick}
    >
      <div class="relative aspect-[4/3] shrink-0 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={600}
          class="absolute inset-0 w-full h-full object-cover block"
          loading="lazy"
          decoding="async"
          srcSet={srcSet}
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        {!!product.tags?.length && (
          <div class="absolute top-2 left-2 right-12 flex gap-2 flex-wrap">
            {product.tags.map((t) => (
              <span
                key={t}
                class="px-2 py-1 rounded-full text-xs font-semibold
                       bg-white/30 dark:bg-black/30 backdrop-blur-md
                       text-onSurface-light dark:text-onSurface-dark
                       shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        )}
        {typeof isFavorite !== "undefined" && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            aria-label={isFavorite
              ? "Remover dos favoritos"
              : "Adicionar aos favoritos"}
            class="absolute bottom-2 right-2 z-10 w-9 h-9 rounded-full
                   flex items-center justify-center
                   bg-white/30 dark:bg-black/30 backdrop-blur-md
                   shadow-md hover:opacity-90 transition"
          >
            <Icon
              name={isFavorite ? "heart" : "heart-outline"}
              size={18}
              class={isFavorite
                ? "text-favorite-light dark:text-favorite-dark"
                : "text-onSurface-light dark:text-onSurface-dark"}
            />
          </button>
        )}
        {outOfStock && (
          <div class="absolute inset-0 grid place-items-center bg-black/45">
            <span class="text-white font-bold">Indisponível</span>
          </div>
        )}
      </div>
      <div class="p-3 flex flex-col gap-1 flex-1">
        <h3 class="text-sm font-extrabold leading-5 min-h-[36px]
            text-onSurface-light dark:text-onSurface-dark">
          {product.name}
        </h3>
        <p
          class="text-[11px] leading-4 truncate
            text-outline-light dark:text-outline-dark"
          title={product.sku}
        >
          SKU: {product.sku}
        </p>
        {product.description && (
          <p
            class="text-xs leading-5 line-clamp-2 opacity-90
              text-text-light dark:text-text-dark"
            title={product.description}
          >
            {product.description}
          </p>
        )}
        <div class="mt-1">
          <p class="text-base font-extrabold text-onSurface-light dark:text-onSurface-dark">
            {formatBRL(product.price)}
          </p>
          <p class="text-[10px] mt-0.5 text-outline-light dark:text-outline-dark">
            {product.stock} em estoque
          </p>
        </div>
        {!!product.rating && (
          <div
            class="flex items-center mt-1"
            aria-label={`Avaliação ${product.rating.toFixed(1)} de 5`}
          >
            {Array.from({ length: 5 }).map((_, i) => {
              let name: "star" | "star-outline" | "star-half-full" =
                "star-outline";
              if (i < fullStars) name = "star";
              else if (i === fullStars && hasHalf) name = "star-half-full";
              return (
                <Icon
                  key={i}
                  name={name}
                  size={16}
                  class={name === "star-outline"
                    ? "text-outline-light dark:text-outline-dark mr-0.5"
                    : "text-star-light dark:text-star-dark mr-0.5"}
                  ariaLabel={i === 0 ? "estrelas" : undefined}
                />
              );
            })}
            <span class="text-[11px] ml-1 text-outline-light dark:text-outline-dark">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
      <QuantityControls
        quantity={quantity}
        stock={product.stock}
        onAdd={onAdd}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        outOfStock={outOfStock}
      />
    </div>
  );
}

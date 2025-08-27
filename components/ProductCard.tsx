import Icon from "./Icon.tsx";
import type { Product } from "../data/products.ts";

type Props = {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onClick?: () => void;
  class?: string;
};

export default function ProductCard({
  product,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
  onClick,
  class: cls = "",
}: Props) {
  const outOfStock = product.stock === 0;
  const fullStars = Math.floor(product.rating ?? 0);
  const hasHalf = (product.rating ?? 0) - fullStars >= 0.5;

  return (
    <div
      class={`group rounded-xl overflow-hidden border transition
        bg-surface-light dark:bg-surface-dark
        border-outline-light/40 dark:border-outline-dark/40
        ${cls}`}
      role={onClick ? "button" : undefined}
      onClick={onClick}
    >
      {/* imagem + tags + indisponível */}
      <div class="relative aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          class="w-full h-full object-cover"
          loading="lazy"
        />

        {/* tags */}
        {!!product.tags?.length && (
          <div class="absolute top-2 left-2 flex gap-2 flex-wrap">
            {product.tags.map((t) => (
              <span
                key={t}
                class="px-2 py-1 rounded-full text-xs font-semibold
                  bg-primary-light dark:bg-primary-dark
                  text-onPrimary-light dark:text-onPrimary-dark"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* indisponível */}
        {outOfStock && (
          <div class="absolute inset-0 grid place-items-center bg-black/45">
            <span class="text-white font-bold">Indisponível</span>
          </div>
        )}
      </div>

      {/* conteúdo */}
      <div class="p-3 flex flex-col gap-1">
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

        {/* preço + estoque */}
        <div class="mt-1">
          <p class="text-base font-extrabold text-onSurface-light dark:text-onSurface-dark">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            })
              .format(product.price)}
          </p>
          <p class="text-[10px] mt-0.5 text-outline-light dark:text-outline-dark">
            {product.stock} em estoque
          </p>
        </div>

        {/* rating */}
        {!!product.rating && (
          <div
            class="flex items-center mt-1"
            aria-label={`Avaliação ${product.rating.toFixed(1)} de 5`}
          >
            {Array.from({ length: 5 }).map((_, i) => {
              let name = "star-outline";
              if (i < fullStars) name = "star";
              else if (i === fullStars && hasHalf) name = "star-half-full";
              return (
                <Icon
                  key={i}
                  name={name}
                  family="material-community"
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

      {/* footer ações */}
      <div class="mt-auto p-3 bg-surfaceVariant-light/60 dark:bg-surfaceVariant-dark/60">
        {quantity === 0
          ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              disabled={outOfStock}
              class={`w-full h-10 rounded-lg font-bold inline-flex items-center justify-center gap-2
              bg-primary-light text-onPrimary-light
              dark:bg-primary-dark dark:text-onPrimary-dark
              transition-opacity ${
                outOfStock ? "opacity-50" : "hover:opacity-90"
              }`}
            >
              <Icon name="cart-outline" family="material-community" size={18} />
              Adicionar
            </button>
          )
          : (
            <div class="flex items-center justify-between">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDecrease();
                }}
                class="w-10 h-9 rounded-lg border
                border-outline-light/60 dark:border-outline-dark/60
                text-onSurface-light dark:text-onSurface-dark"
                aria-label="Diminuir quantidade"
              >
                <Icon name="minus" family="material-community" size={18} />
              </button>
              <span class="min-w-6 text-center font-extrabold
              text-onSurface-light dark:text-onSurface-dark">
                {quantity}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onIncrease();
                }}
                disabled={quantity >= product.stock}
                class={`w-10 h-9 rounded-lg border
                border-outline-light/60 dark:border-outline-dark/60
                text-onSurface-light dark:text-onSurface-dark
                ${
                  quantity >= product.stock ? "opacity-50" : "hover:opacity-90"
                }`}
                aria-label="Aumentar quantidade"
              >
                <Icon name="plus" family="material-community" size={18} />
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

import { MOCK_PRODUCTS, type Product } from "../data/products.ts";
import ProductCard from "../components/ProductCard.tsx";
import { clear, dec, inc, qty } from "../state/cart.ts";
import { formatBRL } from "../utils/currency.ts";
import { LinkButton } from "../components/LinkButton.tsx";
import Icon from "../components/Icon.tsx";

type CartItem = Product & { quantity: number };

export default function OrdersView() {
  const items: CartItem[] = Object.entries(qty.value)
    .map(([id, q]) => {
      const p = MOCK_PRODUCTS.find((pp) => pp.id === id);
      if (!p || q <= 0) return null;
      return { ...p, quantity: q };
    })
    .filter(Boolean) as CartItem[];

  const subtotal = items.reduce(
    (acc, it) => acc + Number(it.price) * Number(it.quantity),
    0,
  );

  if (items.length === 0) {
    return (
      <div class="min-h-[60vh] grid place-items-center">
        <div class="text-center max-w-sm mx-auto">
          <Icon
            name="cart-off"
            size={56}
            class="mx-auto text-outline-light dark:text-outline-dark"
          />
          <h2 class="text-2xl font-bold mt-2 text-onSurface-light dark:text-onSurface-dark">
            Seu carrinho está vazio
          </h2>
          <p class="mt-2 text-onSurface-light/80 dark:text-onSurface-dark/80">
            Adicione itens na tela “Início”.
          </p>
          <LinkButton href="/" text="Explorar produtos" class="mt-4" />
        </div>
      </div>
    );
  }

  const shipping = 10;
  const taxes = 0;
  const discount = 0;
  const extras = shipping + taxes - discount;
  const hasExtras = extras !== 0;
  const finalTotal = subtotal + extras;
  const totalLabel = hasExtras ? "Total" : "Subtotal";
  const totalValue = hasExtras ? finalTotal : subtotal;

  const containerClass =
    "flex flex-col gap-4 pb-[calc(env(safe-area-inset-bottom)+92px)] md:pb-0";

  const totalBarClass = "sticky z-30 md:bottom-3 rounded-xl px-4 py-3 border " +
    "bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur " +
    "border-outline-light/40 dark:border-outline-dark/40 " +
    "flex items-center justify-between gap-3";

  const totalLabelClass =
    "text-onSurface-light dark:text-onSurface-dark font-semibold";

  const totalValueClass =
    "text-lg font-extrabold text-onSurface-light dark:text-onSurface-dark";

  const clearButtonClass =
    "ml-2 text-sm text-outline-light dark:text-outline-dark hover:opacity-80";

  const checkoutButtonClass = "px-4 py-2 rounded-lg font-semibold " +
    "bg-primary-light text-onPrimary-light " +
    "dark:bg-primary-dark dark:text-onPrimary-dark hover:opacity-90";

  return (
    <div class={containerClass}>
      <div
        class="grid gap-3 justify-items-center"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
      >
        {items.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            quantity={item.quantity}
            onAdd={() => inc(item.id, item.stock)}
            onIncrease={() => inc(item.id, item.stock)}
            onDecrease={() => dec(item.id)}
          />
        ))}
      </div>

      <div
        class={`hidden md:flex ${totalBarClass}`}
        aria-label={`${totalLabel} ${formatBRL(totalValue)}`}
      >
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <span class={totalLabelClass}>{totalLabel}</span>
            <span class={totalValueClass}>{formatBRL(totalValue)}</span>
          </div>
          {hasExtras && (
            <div class="flex items-center gap-3 text-sm text-onSurface-light dark:text-onSurface-dark">
              <span class="opacity-70">|</span>
              <span>
                Subtotal: <strong>{formatBRL(subtotal)}</strong>
              </span>
              <span>
                Frete: <strong>{formatBRL(shipping)}</strong>
              </span>
              <span>
                Impostos: <strong>{formatBRL(taxes)}</strong>
              </span>
              <span>
                Desconto: <strong>-{formatBRL(discount)}</strong>
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={() => clear()}
            class={clearButtonClass}
          >
            Limpar
          </button>
        </div>
        <button
          type="button"
          class={checkoutButtonClass}
          onClick={() => console.log("checkout")}
        >
          Finalizar pedido ({items.length})
        </button>
      </div>

      <div class="md:hidden mx-2 mt-4 space-y-3" aria-label="Resumo do pedido">
        <div class="rounded-xl px-4 py-3 border bg-surface-light/95 dark:bg-surface-dark/95 backdrop-blur border-outline-light/40 dark:border-outline-dark/40">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="font-semibold text-onSurface-light dark:text-onSurface-dark">
                {totalLabel}
              </span>
              <button
                type="button"
                onClick={() => clear()}
                class="text-sm text-outline-light dark:text-outline-dark hover:opacity-80"
              >
                Limpar
              </button>
            </div>
            <span class="text-lg font-extrabold text-onSurface-light dark:text-onSurface-dark">
              {formatBRL(totalValue)}
            </span>
          </div>
          {hasExtras && (
            <div class="mt-2 pt-2 border-t border-outline-light/30 dark:border-outline-dark/30 text-sm">
              <div class="flex items-center justify-between py-0.5">
                <span class="text-outline-light dark:text-outline-dark">
                  Subtotal
                </span>
                <span class="text-onSurface-light dark:text-onSurface-dark">
                  {formatBRL(subtotal)}
                </span>
              </div>
              <div class="flex items-center justify-between py-0.5">
                <span class="text-outline-light dark:text-outline-dark">
                  Frete
                </span>
                <span class="text-onSurface-light dark:text-onSurface-dark">
                  {formatBRL(shipping)}
                </span>
              </div>
              <div class="flex items-center justify-between py-0.5">
                <span class="text-outline-light dark:text-outline-dark">
                  Impostos
                </span>
                <span class="text-onSurface-light dark:text-onSurface-dark">
                  {formatBRL(taxes)}
                </span>
              </div>
              <div class="flex items-center justify-between py-0.5">
                <span class="text-outline-light dark:text-outline-dark">
                  Desconto
                </span>
                <span class="text-onSurface-light dark:text-onSurface-dark">
                  -{formatBRL(discount)}
                </span>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          class="w-full px-4 py-3 rounded-lg font-semibold bg-primary-light text-onPrimary-light dark:bg-primary-dark dark:text-onPrimary-dark hover:opacity-90"
          onClick={() => console.log("checkout")}
        >
          Finalizar pedido ({items.length})
        </button>
      </div>
    </div>
  );
}

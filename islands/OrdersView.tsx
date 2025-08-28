import { MOCK_PRODUCTS, type Product } from "../data/products.ts";
import ProductCard from "../components/ProductCard.tsx";
import { clear, dec, inc, qty } from "../state/cart.ts";

type CartItem = Product & { quantity: number };

export default function OrdersView() {
  const items: CartItem[] = Object.entries(qty.value)
    .map(([id, q]) => {
      const p = MOCK_PRODUCTS.find((pp) => pp.id === id);
      if (!p || q <= 0) return null;
      return { ...p, quantity: q };
    })
    .filter(Boolean) as CartItem[];

  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);

  if (items.length === 0) {
    return (
      <div class="min-h-[60vh] grid place-items-center">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-onSurface-light dark:text-onSurface-dark">
            Seu carrinho está vazio
          </h2>
          <p class="mt-2 text-onSurface-light/80 dark:text-onSurface-dark/80">
            Adicione itens na tela “Início”.
          </p>
          <a
            href="/"
            class="inline-flex items-center justify-center mt-4 px-4 py-2 rounded font-semibold
                 bg-primary-light text-onPrimary-light
                 dark:bg-primary-dark dark:text-onPrimary-dark hover:opacity-90"
          >
            Explorar produtos
          </a>
        </div>
      </div>
    );
  }

  const containerClass =
    "flex flex-col gap-4 pb-[calc(env(safe-area-inset-bottom)+92px)] md:pb-0";

  const totalBarClass =
    "sticky bottom-[calc(env(safe-area-inset-bottom)+80px)] md:bottom-3 rounded-xl px-4 py-3 border " +
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
            class="h-full"
          />
        ))}
      </div>

      <div
        class={totalBarClass}
        aria-label={`Total ${
          new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
            .format(subtotal)
        }`}
      >
        <div class="flex items-center gap-2">
          <span class={totalLabelClass}>Total</span>
          <span class={totalValueClass}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(subtotal)}
          </span>
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
    </div>
  );
}

import type { Product } from "~/types";

const buildDefaultCart = (products: Product[]) =>
  products.reduce((acc, product) => {
    acc[product.id] = 0;
    return acc;
  }, {} as Record<string, number>);

export const useStorefront = () => {
  const MAX_ITEM_QUANTITY = 20;
  const products = useState<Product[]>("sb-products", () => []);
  const cart = useState<Record<string, number>>("sb-cart", () => ({}));

  const setProducts = (items: Product[]) => {
    products.value = items;
    const nextCart = { ...cart.value };
    for (const product of items) {
      if (typeof nextCart[product.id] !== "number") {
        nextCart[product.id] = 0;
      }
    }
    for (const existingId of Object.keys(nextCart)) {
      if (!items.some((item) => item.id === existingId)) {
        delete nextCart[existingId];
      }
    }
    cart.value = nextCart;
  };

  const increase = (productId: string, step = 1) => {
    const target = products.value.find((item) => item.id === productId);
    if (!target?.inStock) {
      return;
    }
    const next = (cart.value[productId] || 0) + step;
    cart.value[productId] = Math.min(MAX_ITEM_QUANTITY, next);
  };

  const decrease = (productId: string) => {
    cart.value[productId] = Math.max(0, (cart.value[productId] || 0) - 1);
  };

  const clearCart = () => {
    cart.value = buildDefaultCart(products.value);
  };

  const selectedItems = computed(() =>
    products.value
      .map((product) => ({
        ...product,
        quantity: cart.value[product.id] || 0,
      }))
      .filter((item) => item.quantity > 0),
  );

  const totalItems = computed(() =>
    selectedItems.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  const totalAmount = computed(() =>
    selectedItems.value.reduce((sum, item) => sum + item.quantity * item.price, 0),
  );

  const currency = (value: number) => `KES ${value}`;

  return {
    products,
    setProducts,
    cart,
    increase,
    decrease,
    clearCart,
    selectedItems,
    totalItems,
    totalAmount,
    currency,
  };
};

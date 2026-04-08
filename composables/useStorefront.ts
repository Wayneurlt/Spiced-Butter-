type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const STORE_PRODUCTS: Product[] = [
  {
    id: "chili-oil",
    name: "Chili Oil",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ukwaju-dip",
    name: "Ukwaju Dip",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1609501676725-7186f7340f81?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mango-chutney",
    name: "Mango Chutney",
    price: 300,
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "green-sauce",
    name: "Green Sauce",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1529059997568-3d847b1154f0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "pickled-onions",
    name: "Pickled Onions",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sweet-soy-glaze",
    name: "Sweet Soy Glaze",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
  },
];

const buildDefaultCart = () =>
  STORE_PRODUCTS.reduce((acc, product) => {
    acc[product.id] = 0;
    return acc;
  }, {} as Record<string, number>);

export const useStorefront = () => {
  const products = STORE_PRODUCTS;
  const cart = useState<Record<string, number>>("sb-cart", buildDefaultCart);

  const increase = (productId: string) => {
    cart.value[productId] = (cart.value[productId] || 0) + 1;
  };

  const decrease = (productId: string) => {
    cart.value[productId] = Math.max(0, (cart.value[productId] || 0) - 1);
  };

  const clearCart = () => {
    cart.value = buildDefaultCart();
  };

  const selectedItems = computed(() =>
    products
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

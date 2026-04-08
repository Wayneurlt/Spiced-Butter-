type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  note: string;
  size: string;
  category: "hot" | "sweet" | "tangy" | "savory";
  badge?: string;
};

const STORE_PRODUCTS: Product[] = [
  {
    id: "chili-oil",
    name: "Chili Oil",
    price: 250,
    note: "Bold heat with a smoky finish",
    size: "250g jar",
    category: "hot",
    badge: "Most Popular",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "ukwaju-dip",
    name: "Ukwaju Dip",
    price: 300,
    note: "Tangy tamarind depth for grilled meals",
    size: "250g jar",
    category: "tangy",
    image:
      "https://images.unsplash.com/photo-1609501676725-7186f7340f81?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mango-chutney",
    name: "Mango Chutney",
    price: 300,
    note: "Sweet-fruity balance with gentle spice",
    size: "250g jar",
    category: "sweet",
    badge: "Chef Pick",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "green-sauce",
    name: "Green Sauce",
    price: 250,
    note: "Herby and fresh with zesty brightness",
    size: "250g jar",
    category: "savory",
    image:
      "https://images.unsplash.com/photo-1529059997568-3d847b1154f0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "pickled-onions",
    name: "Pickled Onions",
    price: 250,
    note: "Crunchy, sharp and naturally vibrant",
    size: "250g jar",
    category: "tangy",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "sweet-soy-glaze",
    name: "Sweet Soy Glaze",
    price: 350,
    note: "Rich umami glaze with sweet depth",
    size: "250g jar",
    category: "savory",
    badge: "New",
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
  const MAX_ITEM_QUANTITY = 20;
  const products = STORE_PRODUCTS;
  const cart = useState<Record<string, number>>("sb-cart", buildDefaultCart);

  const increase = (productId: string, step = 1) => {
    const next = (cart.value[productId] || 0) + step;
    cart.value[productId] = Math.min(MAX_ITEM_QUANTITY, next);
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

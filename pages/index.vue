<script setup lang="ts">
import type { Product } from "~/types";

const { products, setProducts, cart, increase, decrease, currency } = useStorefront();
const activeCategory = ref<"all" | "hot" | "sweet" | "tangy" | "savory">("all");
const flippedProductId = ref<string | null>(null);

const { data } = await useAsyncData(
  "storefront-products",
  () => $fetch<{ items: Product[] }>("/api/products"),
  { server: true },
);

watchEffect(() => {
  if (data.value?.items) {
    setProducts(data.value.items);
  }
});

let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(async () => {
    const latest = await $fetch<{ items: Product[] }>("/api/products");
    setProducts(latest.items);
  }, 15000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  if (import.meta.client) {
    window.removeEventListener("keydown", onGlobalEscape);
  }
});

const filteredProducts = computed(() =>
  activeCategory.value === "all"
    ? products.value
    : products.value.filter((product) => product.category === activeCategory.value),
);

function toggleFlip(productId: string) {
  flippedProductId.value = flippedProductId.value === productId ? null : productId;
}

function closeFlip() {
  flippedProductId.value = null;
}

function onGlobalEscape(e: KeyboardEvent) {
  if (e.key === "Escape" && flippedProductId.value) {
    closeFlip();
  }
}

watch(activeCategory, () => {
  closeFlip();
});

watch(flippedProductId, (id) => {
  if (!import.meta.client) return;
  window.removeEventListener("keydown", onGlobalEscape);
  if (id) {
    window.addEventListener("keydown", onGlobalEscape);
  }
});
</script>

<template>
  <main class="sb-page">
    <StoreHeader />

    <section class="sb-hero">
      <div class="sb-hero__overlay">
        <h1 class="sb-hero__heading">About</h1>
        <p class="sb-hero__description">
          Spiced Butter is a celebration of bold flavors and thoughtful craftsmanship.
          Our range of lovingly handmade condiments and relishes is created in small
          batches using carefully selected, fresh, locally sourced ingredients bringing
          you bold, authentic tastes, delivering freshness and quality in every jar.
          Rooted in home cooking and inspired by vibrant tastes, Spiced Butter is your
          companion in turning everyday dishes into memorable experiences.
        </p>
      </div>
    </section>

    <section class="sb-content sb-content--catalogue">
      <div class="sb-filters">
        <button
          type="button"
          class="sb-chip"
          :class="{ 'sb-chip--active': activeCategory === 'all' }"
          @click="activeCategory = 'all'"
        >
          All
        </button>
        <button
          type="button"
          class="sb-chip"
          :class="{ 'sb-chip--active': activeCategory === 'hot' }"
          @click="activeCategory = 'hot'"
        >
          Hot
        </button>
        <button
          type="button"
          class="sb-chip"
          :class="{ 'sb-chip--active': activeCategory === 'sweet' }"
          @click="activeCategory = 'sweet'"
        >
          Sweet
        </button>
        <button
          type="button"
          class="sb-chip"
          :class="{ 'sb-chip--active': activeCategory === 'tangy' }"
          @click="activeCategory = 'tangy'"
        >
          Tangy
        </button>
        <button
          type="button"
          class="sb-chip"
          :class="{ 'sb-chip--active': activeCategory === 'savory' }"
          @click="activeCategory = 'savory'"
        >
          Savory
        </button>
      </div>

      <div class="sb-grid">
        <article
          v-for="product in filteredProducts"
          :key="product.id"
          class="sb-card"
          :class="{ 'sb-card--flipped': flippedProductId === product.id }"
        >
          <div class="sb-card__inner">
            <div class="sb-card__face sb-card__face--front">
              <span v-if="product.badge" class="sb-card__badge">{{ product.badge }}</span>
              <div class="sb-card__media">
                <img :src="product.image" :alt="product.name" class="sb-card__image" />
              </div>
              <div class="sb-card__meta">
                <div class="sb-card__info">
                  <h2 class="sb-card__name">{{ product.name }}</h2>
                  <p class="sb-card__note">{{ product.note }}</p>
                  <p class="sb-card__size">{{ product.size }}</p>
                  <p class="sb-card__price">{{ currency(product.price) }}</p>
                  <p v-if="!product.inStock" class="sb-card__note text-red-300">Out of stock</p>
                  <p v-if="cart[product.id] > 0" class="sb-card__line-total">
                    Line total: {{ currency(cart[product.id] * product.price) }}
                  </p>
                </div>
                <div class="sb-card__controls" @click.stop>
                  <button
                    type="button"
                    class="sb-qty"
                    :disabled="cart[product.id] === 0 || !product.inStock"
                    @click="decrease(product.id)"
                  >
                    -
                  </button>
                  <span class="sb-qty__value">{{ cart[product.id] }}</span>
                  <button type="button" class="sb-qty" :disabled="!product.inStock" @click="increase(product.id)">+</button>
                </div>
              </div>
              <div class="sb-card__action-bar sb-card__action-bar--front">
                <span class="sb-card__action-hint">Full story</span>
                <button
                  type="button"
                  class="sb-card__action-btn"
                  :aria-expanded="flippedProductId === product.id"
                  :aria-controls="'card-back-' + product.id"
                  @click.stop="toggleFlip(product.id)"
                >
                  Details
                </button>
              </div>
            </div>
            <div class="sb-card__face sb-card__face--back">
              <div
                class="sb-card__back-body"
                :id="'card-back-' + product.id"
                role="region"
                :aria-labelledby="'card-back-title-' + product.id"
              >
                <h3 :id="'card-back-title-' + product.id" class="sb-card__back-title">{{ product.name }}</h3>
                <p class="sb-card__back-copy">{{ product.description || product.note }}</p>
              </div>
              <div class="sb-card__action-bar sb-card__action-bar--back">
                <button type="button" class="sb-card__action-btn sb-card__action-btn--secondary" @click.stop="closeFlip()">
                  Back
                </button>
                <div class="sb-card__controls" @click.stop>
                  <button
                    type="button"
                    class="sb-qty"
                    :disabled="cart[product.id] === 0 || !product.inStock"
                    @click="decrease(product.id)"
                  >
                    -
                  </button>
                  <span class="sb-qty__value">{{ cart[product.id] }}</span>
                  <button type="button" class="sb-qty" :disabled="!product.inStock" @click="increase(product.id)">+</button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { products, cart, increase, decrease, currency } = useStorefront();
const activeCategory = ref<"all" | "hot" | "sweet" | "tangy" | "savory">("all");

const filteredProducts = computed(() =>
  activeCategory.value === "all"
    ? products
    : products.filter((product) => product.category === activeCategory.value),
);
</script>

<template>
  <main class="sb-page">
    <StoreHeader />

    <section class="sb-hero">
      <div class="sb-hero__overlay">
        <h1 class="sb-hero__heading">About Spiced Butter</h1>
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
        <article v-for="product in filteredProducts" :key="product.id" class="sb-card">
          <span v-if="product.badge" class="sb-card__badge">{{ product.badge }}</span>
          <img :src="product.image" :alt="product.name" class="sb-card__image" />
          <div class="sb-card__meta">
            <div class="sb-card__info">
              <h2 class="sb-card__name">{{ product.name }}</h2>
              <p class="sb-card__note">{{ product.note }}</p>
              <p class="sb-card__size">{{ product.size }}</p>
              <p class="sb-card__price">{{ currency(product.price) }}</p>
              <p v-if="cart[product.id] > 0" class="sb-card__line-total">
                Line total: {{ currency(cart[product.id] * product.price) }}
              </p>
            </div>
            <div class="sb-card__controls">
              <button
                type="button"
                class="sb-qty"
                :disabled="cart[product.id] === 0"
                @click="decrease(product.id)"
              >
                -
              </button>
              <span class="sb-qty__value">{{ cart[product.id] }}</span>
              <button type="button" class="sb-qty" @click="increase(product.id)">+</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

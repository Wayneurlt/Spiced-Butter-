<script setup lang="ts">
const { products, cart, increase, decrease, currency } = useStorefront();
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
      <div class="sb-grid">
        <article v-for="product in products" :key="product.id" class="sb-card">
          <img :src="product.image" :alt="product.name" class="sb-card__image" />
          <div class="sb-card__meta">
            <div>
              <h2 class="sb-card__name">{{ product.name }}</h2>
              <p class="sb-card__price">{{ currency(product.price) }}</p>
            </div>
            <div class="sb-card__controls">
              <button type="button" class="sb-qty" @click="decrease(product.id)">-</button>
              <span class="sb-qty__value">{{ cart[product.id] }}</span>
              <button type="button" class="sb-qty" @click="increase(product.id)">+</button>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

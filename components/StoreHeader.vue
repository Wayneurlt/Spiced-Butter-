<script setup lang="ts">
const { selectedItems, totalItems, totalAmount, currency, increase, decrease } =
  useStorefront();
const cartOpen = ref(false);
</script>

<template>
  <header class="sb-header">
    <NuxtLink to="/" class="sb-brand">
      <img src="/logo.jpeg" alt="Spiced Butter logo" class="sb-brand__logo" />
      <span class="sb-brand__text">
        <span class="sb-brand__sub">Curated by M</span>
        <span class="sb-brand__main">SPICED BUTTER</span>
      </span>
    </NuxtLink>

    <div
      class="sb-cart"
      @mouseenter="cartOpen = true"
      @mouseleave="cartOpen = false"
    >
      <NuxtLink
        to="/checkout"
        class="sb-cart__trigger"
        aria-label="View cart"
      >
        <svg
          class="sb-cart__icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M3 4H5L7.4 14.6C7.51 15.08 7.87 15.42 8.36 15.5H18.7C19.16 15.5 19.56 15.2 19.7 14.76L21.5 9.2C21.7 8.58 21.23 8 20.58 8H6.2"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <circle cx="9" cy="19" r="1.6" fill="currentColor" />
          <circle cx="18" cy="19" r="1.6" fill="currentColor" />
        </svg>
        <span class="sb-cart__badge">{{ totalItems }}</span>
      </NuxtLink>

      <div v-show="cartOpen" class="sb-cart__panel">
        <p v-if="selectedItems.length === 0" class="sb-cart__empty">
          Your cart is empty.
        </p>
        <ul v-else class="sb-cart__list">
          <li v-for="item in selectedItems" :key="item.id" class="sb-cart__item">
            <div class="sb-cart__item-main">
              <span>{{ item.name }}</span>
              <strong>{{ currency(item.quantity * item.price) }}</strong>
            </div>
            <div class="sb-cart__item-controls">
              <button type="button" class="sb-qty sb-qty--small" @click="decrease(item.id)">
                -
              </button>
              <span class="sb-qty__value">{{ item.quantity }}</span>
              <button type="button" class="sb-qty sb-qty--small" @click="increase(item.id)">
                +
              </button>
            </div>
          </li>
        </ul>
        <div class="sb-cart__footer">
          <span>Total: {{ currency(totalAmount) }}</span>
          <NuxtLink to="/checkout" class="sb-cart__checkout">Checkout</NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>

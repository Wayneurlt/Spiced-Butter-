<script setup lang="ts">
const WHATSAPP_NUMBER = "254704444389";
const { selectedItems, totalAmount, currency, clearCart, increase, decrease } =
  useStorefront();

const whatsappMessage = computed(() => {
  const lines = [
    "Hello Spiced Butter, I would like to place an order:",
    "",
    ...selectedItems.value.map(
      (item) =>
        `- ${item.name} x${item.quantity} = KES ${item.quantity * item.price}`,
    ),
    "",
    `Total: KES ${totalAmount.value}`,
    "",
    "Please confirm availability and delivery details.",
  ];

  return encodeURIComponent(lines.join("\n"));
});

const whatsappUrl = computed(
  () => `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage.value}`,
);
</script>

<template>
  <main class="sb-page">
    <StoreHeader />

    <section class="sb-checkout-page">
      <div class="sb-checkout-card">
        <h1 class="sb-checkout-card__title">Checkout</h1>
        <p class="sb-checkout-card__text">
          Your order will be completed on WhatsApp.
        </p>

        <p v-if="selectedItems.length === 0" class="sb-checkout__empty">
          Your cart is currently empty. Add condiments from the catalogue.
        </p>

        <ul v-else class="sb-checkout__list">
          <li v-for="item in selectedItems" :key="item.id" class="sb-checkout__row">
            <div class="sb-checkout__item-main">
              <span>{{ item.name }}</span>
              <span>{{ currency(item.quantity * item.price) }}</span>
            </div>
            <div class="sb-checkout__item-controls">
              <button type="button" class="sb-qty" @click="decrease(item.id)">-</button>
              <span class="sb-qty__value">{{ item.quantity }}</span>
              <button type="button" class="sb-qty" @click="increase(item.id)">+</button>
            </div>
          </li>
        </ul>

        <div class="sb-checkout__total">
          <span>Total</span>
          <strong>{{ currency(totalAmount) }}</strong>
        </div>

        <div class="sb-checkout-card__actions">
          <NuxtLink to="/" class="sb-back-catalogue">
            ← Continue Shopping (Add More Products)
          </NuxtLink>

          <a
            class="sb-whatsapp"
            :class="{ 'sb-whatsapp--disabled': selectedItems.length === 0 }"
            :href="selectedItems.length > 0 ? whatsappUrl : undefined"
            target="_blank"
            rel="noopener noreferrer"
          >
            Confirm Order on WhatsApp
          </a>

          <button type="button" class="sb-clear" @click="clearCart">
            Clear Cart
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

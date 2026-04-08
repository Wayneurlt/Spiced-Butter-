<template>
  <div class="min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-md bg-white/10 rounded-xl p-6 border border-white/10">
      <h1 class="text-xl font-bold text-pink-600 mb-4">Admin Login</h1>
      <p class="text-sm text-gray-300 mb-4">Sign in to manage products and stock updates.</p>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-white mb-1">Email</label>
          <input
            v-model.trim="email"
            type="email"
            required
            autocomplete="email"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 bg-white"
          />
        </div>
        <div>
          <label class="block text-white mb-1">Password</label>
          <div class="flex gap-2">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              autocomplete="current-password"
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 bg-white"
            />
            <button
              type="button"
              class="px-3 rounded border border-gray-300 text-sm text-white"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? "Hide" : "Show" }}
            </button>
          </div>
        </div>
        <p v-if="error" class="text-red-300 text-sm">{{ error }}</p>
        <button
          type="submit"
          :disabled="isSubmitting || isLockedOut || !canSubmit"
          class="w-full bg-pink-600 text-white py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? "Signing in..." : "Sign in" }}
        </button>
        <p v-if="isLockedOut" class="text-amber-300 text-sm">
          Too many failed attempts. Try again in {{ lockoutSecondsRemaining }}s.
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "#app";
import { useAdminAuth } from "~/composables/useAdminAuth";

definePageMeta({ middleware: [] });

const router = useRouter();
const route = useRoute();
const { login, isAuthenticated } = useAdminAuth();

const email = ref("");
const password = ref("");
const error = ref("");
const isSubmitting = ref(false);
const showPassword = ref(false);
const failedAttempts = ref(0);
const lockoutUntil = ref<number | null>(null);
const now = ref(Date.now());

const canSubmit = computed(() => email.value.includes("@") && password.value.length >= 8);
const isLockedOut = computed(() => !!lockoutUntil.value && now.value < lockoutUntil.value);
const lockoutSecondsRemaining = computed(() => {
  if (!isLockedOut.value || !lockoutUntil.value) return 0;
  return Math.max(1, Math.ceil((lockoutUntil.value - now.value) / 1000));
});

onMounted(() => {
  if (isAuthenticated()) {
    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/admin";
    router.replace(redirect);
    return;
  }
  const timer = setInterval(() => {
    now.value = Date.now();
  }, 500);
  onUnmounted(() => clearInterval(timer));
});

async function onSubmit() {
  error.value = "";
  if (isSubmitting.value || isLockedOut.value || !canSubmit.value) {
    return;
  }

  isSubmitting.value = true;
  try {
    const ok = await login(email.value.trim().toLowerCase(), password.value);
    if (ok) {
      failedAttempts.value = 0;
      const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/admin";
      router.push(redirect);
      return;
    }

    failedAttempts.value += 1;
    if (failedAttempts.value >= 5) {
      lockoutUntil.value = Date.now() + 30_000;
      failedAttempts.value = 0;
      error.value = "Too many invalid attempts.";
      return;
    }
    error.value = "Invalid credentials.";
  } catch {
    error.value = "Login failed. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}
</script>

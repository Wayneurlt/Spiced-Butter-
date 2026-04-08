<template>
  <div class="min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-md bg-white/10 rounded-xl p-6">
      <h1 class="text-xl font-bold text-pink-600 mb-4">Admin Login</h1>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-white mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500" />
        </div>
        <div>
          <label class="block text-white mb-1">Password</label>
          <input v-model="password" type="password" required class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500" />
        </div>
        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
        <button type="submit" class="w-full bg-pink-600 text-white py-2 rounded">Sign in</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "#app";
import { useAdminAuth } from "~/composables/useAdminAuth";

const router = useRouter();
const { login } = useAdminAuth();

const email = ref("");
const password = ref("");
const error = ref("");

async function onSubmit() {
  error.value = "";
  const ok = await login(email.value, password.value);
  if (ok) {
    router.push("/admin");
  } else {
    error.value = "Invalid credentials";
  }
}
</script>

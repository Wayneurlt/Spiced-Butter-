<template>
  <div class="min-h-screen bg-[var(--sb-cream)] text-[var(--sb-brown-deep)]">
    <div class="mx-auto max-w-7xl md:grid md:grid-cols-[250px_1fr] md:gap-6 md:px-4 md:py-6">
      <aside class="hidden md:block rounded-2xl border border-[#ddb57a] bg-[#fff5e4] p-4 h-[calc(100vh-3rem)] sticky top-6 overflow-auto">
        <p class="text-xs uppercase tracking-wide text-[#9a6a21]">Spiced Butter</p>
        <h1 class="text-xl font-bold mb-6">Admin Panel</h1>
        <nav class="space-y-2">
          <button class="w-full text-left rounded-lg px-3 py-2 font-medium" :class="activeTab === 'overview' ? 'bg-[var(--sb-brown)] text-white' : 'hover:bg-[#f7e2c1]'" @click="activeTab = 'overview'">Overview</button>
          <button class="w-full text-left rounded-lg px-3 py-2 font-medium" :class="activeTab === 'products' ? 'bg-[var(--sb-brown)] text-white' : 'hover:bg-[#f7e2c1]'" @click="activeTab = 'products'">Products</button>
          <button class="w-full text-left rounded-lg px-3 py-2 font-medium" :class="activeTab === 'create' ? 'bg-[var(--sb-brown)] text-white' : 'hover:bg-[#f7e2c1]'" @click="activeTab = 'create'">{{ editingId ? "Edit Product" : "Add Product" }}</button>
        </nav>
        <div class="mt-8 border-t border-[#e2c08d] pt-4 space-y-2">
          <NuxtLink to="/" class="block rounded-lg px-3 py-2 border border-[#c69451] text-center hover:bg-[#f7e2c1]">View Store</NuxtLink>
          <button class="w-full rounded-lg px-3 py-2 bg-[var(--sb-brown)] text-white" @click="logout()">Logout</button>
        </div>
      </aside>

      <main class="min-w-0 pb-36 md:pb-0">
        <section v-if="activeTab === 'overview'" class="space-y-4 px-4 pt-4 md:px-0 md:pt-0">
          <h2 class="text-xl font-bold">Overview</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div class="rounded-xl border border-[#ddb57a] bg-[#fff5e4] p-4"><p class="text-xs text-[#9a6a21]">Total Products</p><p class="text-2xl font-bold">{{ products.length }}</p></div>
            <div class="rounded-xl border border-[#ddb57a] bg-[#fff5e4] p-4"><p class="text-xs text-[#9a6a21]">In Stock</p><p class="text-2xl font-bold text-emerald-700">{{ inStockCount }}</p></div>
            <div class="rounded-xl border border-[#ddb57a] bg-[#fff5e4] p-4"><p class="text-xs text-[#9a6a21]">Out of Stock</p><p class="text-2xl font-bold text-red-700">{{ outOfStockCount }}</p></div>
            <div class="rounded-xl border border-[#ddb57a] bg-[#fff5e4] p-4"><p class="text-xs text-[#9a6a21]">Avg. Price</p><p class="text-2xl font-bold">{{ currency(avgPrice) }}</p></div>
          </div>
        </section>

        <section v-if="activeTab === 'create'" class="space-y-4 px-4 pt-4 md:px-0">
          <h2 class="text-xl font-bold">{{ editingId ? "Edit Product" : "Add Product" }}</h2>
          <form class="rounded-2xl border border-[#ddb57a] bg-[#fff5e4] p-4 grid grid-cols-1 md:grid-cols-2 gap-3" @submit.prevent="saveProduct">
            <input v-model.trim="form.name" class="p-2 bg-white border border-[#d7b07a] rounded" placeholder="Name" required />
            <input v-model.number="form.price" type="number" min="0" class="p-2 bg-white border border-[#d7b07a] rounded" placeholder="Price (KES)" required />
            <input v-model.trim="form.image" class="p-2 bg-white border border-[#d7b07a] rounded" placeholder="Image URL" required />
            <input v-model.trim="form.size" class="p-2 bg-white border border-[#d7b07a] rounded" placeholder="Size" required />
            <input v-model.trim="form.badge" class="p-2 bg-white border border-[#d7b07a] rounded" placeholder="Badge (optional)" />
            <select v-model="form.category" class="p-2 bg-white border border-[#d7b07a] rounded">
              <option value="hot">Hot</option><option value="sweet">Sweet</option><option value="tangy">Tangy</option><option value="savory">Savory</option>
            </select>
            <textarea v-model.trim="form.note" class="md:col-span-2 p-2 bg-white border border-[#d7b07a] rounded" rows="3" placeholder="Product note" required />
            <div class="md:col-span-2 rounded border border-[#e7cba4] bg-white p-2 flex items-center gap-3" v-if="form.image">
              <img :src="form.image" alt="preview" class="w-12 h-12 rounded object-cover border border-[#e7cba4]" @error="onImagePreviewError" />
              <span class="text-xs text-[#9a6a21]">Image preview</span>
            </div>
            <label class="text-sm flex items-center gap-2"><input v-model="form.inStock" type="checkbox" />In stock</label>
            <div class="md:col-span-2 flex flex-wrap gap-2">
              <button class="px-4 py-2 rounded bg-[var(--sb-brown)] text-white disabled:opacity-60" :disabled="pending || isSaving || !canSubmit">{{ isSaving ? "Saving..." : editingId ? "Update Product" : "Create Product" }}</button>
              <button v-if="editingId" class="px-4 py-2 rounded border border-[#c69451]" type="button" @click="resetForm">Cancel Edit</button>
            </div>
            <p v-if="formError" class="md:col-span-2 text-sm text-red-700">{{ formError }}</p>
          </form>
        </section>

        <section v-if="activeTab === 'products'" class="space-y-4 px-4 pt-4 md:px-0">
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <h2 class="text-xl font-bold">Manage Products</h2>
            <div class="flex gap-2 w-full md:w-auto">
              <input v-model="search" class="flex-1 md:w-80 p-2 bg-white border border-[#d7b07a] rounded" placeholder="Search products..." />
              <button class="px-4 py-2 rounded border border-[#c69451] hover:bg-[#f7e2c1] whitespace-nowrap" @click="refresh()">Reload</button>
            </div>
          </div>
          <div class="rounded-2xl border border-[#ddb57a] bg-[#fff5e4] overflow-hidden">
            <div class="hidden md:block overflow-x-auto">
            <table class="min-w-[760px] w-full text-sm text-left">
              <thead class="bg-[#f3ddba] text-[#7a4900] uppercase text-xs"><tr><th class="px-4 py-3">Product</th><th class="px-4 py-3">Category</th><th class="px-4 py-3">Price</th><th class="px-4 py-3">Stock</th><th class="px-4 py-3">Actions</th></tr></thead>
              <tbody>
                <tr v-for="product in filteredProducts" :key="product.id" class="border-t border-[#edd3ae]">
                  <td class="px-4 py-3"><div class="font-semibold">{{ product.name }}</div><div class="text-xs text-[#9a6a21]">{{ product.size }} - {{ product.note }}</div></td>
                  <td class="px-4 py-3 capitalize">{{ product.category }}</td>
                  <td class="px-4 py-3">{{ currency(product.price) }}</td>
                  <td class="px-4 py-3"><span :class="product.inStock ? 'text-emerald-700' : 'text-red-700'">{{ product.inStock ? "In stock" : "Out of stock" }}</span></td>
                  <td class="px-4 py-3">
                    <div class="flex flex-wrap gap-2">
                    <button class="px-2 py-1 rounded border border-[#c69451] disabled:opacity-60" :disabled="isMutating" @click="startEdit(product); activeTab = 'create'">Edit</button>
                    <button class="px-2 py-1 rounded bg-[#a5650f] text-white disabled:opacity-60" :disabled="isMutating" @click="toggleStock(product)">{{ product.inStock ? "Set Out" : "Restock" }}</button>
                    <button class="px-2 py-1 rounded bg-red-700 text-white disabled:opacity-60" :disabled="isMutating" @click="removeProduct(product.id)">Delete</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
            <div v-if="!pending && filteredProducts.length === 0" class="p-6 text-center text-[#9a6a21]">
              No products found for this filter.
            </div>
            <div class="md:hidden p-3 space-y-3">
              <div v-for="product in filteredProducts" :key="product.id" class="rounded-xl border border-[#e7cba4] bg-white p-3">
                <div class="font-semibold">{{ product.name }}</div>
                <div class="text-xs text-[#9a6a21]">{{ product.category }} - {{ product.size }}</div>
                <div class="text-sm mt-1">{{ currency(product.price) }}</div>
                <div class="text-sm mt-1" :class="product.inStock ? 'text-emerald-700' : 'text-red-700'">{{ product.inStock ? "In stock" : "Out of stock" }}</div>
                <div class="mt-2 flex gap-2">
                  <button class="px-2 py-1 text-xs rounded border border-[#c69451] disabled:opacity-60" :disabled="isMutating" @click="startEdit(product); activeTab = 'create'">Edit</button>
                  <button class="px-2 py-1 text-xs rounded bg-[#a5650f] text-white disabled:opacity-60" :disabled="isMutating" @click="toggleStock(product)">{{ product.inStock ? "Set Out" : "Restock" }}</button>
                  <button class="px-2 py-1 text-xs rounded bg-red-700 text-white disabled:opacity-60" :disabled="isMutating" @click="removeProduct(product.id)">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <p v-if="pending" class="px-4 md:px-0 text-[#9a6a21] text-sm">Loading products...</p>
        <p v-if="errorText" class="px-4 md:px-0 text-red-700 text-sm">{{ errorText }}</p>
        <p v-if="successText" class="px-4 md:px-0 text-emerald-700 text-sm">{{ successText }}</p>
      </main>

      <nav class="md:hidden fixed bottom-0 inset-x-0 border-t border-[#d9b47f] bg-[#fff4e0] px-4 py-2 z-30 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-6px_16px_rgba(93,55,0,0.16)]">
        <div class="grid grid-cols-3 gap-2">
          <button
            aria-label="Overview"
            title="Overview"
            class="rounded-md py-2.5 flex items-center justify-center"
            :class="activeTab === 'overview' ? 'bg-[var(--sb-brown)] text-white' : 'bg-transparent text-[#7a4900]'"
            @click="activeTab = 'overview'"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12l9-8 9 8"></path>
              <path d="M5 10v10h14V10"></path>
            </svg>
          </button>
          <button
            aria-label="Products"
            title="Products"
            class="rounded-md py-2.5 flex items-center justify-center"
            :class="activeTab === 'products' ? 'bg-[var(--sb-brown)] text-white' : 'bg-transparent text-[#7a4900]'"
            @click="activeTab = 'products'"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="6" rx="1"></rect>
              <rect x="3" y="14" width="18" height="6" rx="1"></rect>
            </svg>
          </button>
          <button
            :aria-label="editingId ? 'Edit Product' : 'Add Product'"
            :title="editingId ? 'Edit Product' : 'Add Product'"
            class="rounded-md py-2.5 flex items-center justify-center"
            :class="activeTab === 'create' ? 'bg-[var(--sb-brown)] text-white' : 'bg-transparent text-[#7a4900]'"
            @click="activeTab = 'create'"
          >
            <svg v-if="!editingId" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
            <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 20h4l10-10-4-4L4 16v4z"></path>
            </svg>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });

import type { Product, ProductCategory, ProductInput } from "~/types";
import { useAdminAuth } from "~/composables/useAdminAuth";

const { logout } = useAdminAuth();
const activeTab = ref<"overview" | "products" | "create">("overview");
const search = ref("");
const editingId = ref<string | null>(null);
const isSaving = ref(false);
const isMutating = ref(false);
const formError = ref("");
const successText = ref("");

const emptyForm = (): ProductInput => ({
  name: "",
  price: 0,
  image: "",
  note: "",
  size: "",
  category: "hot",
  badge: "",
  inStock: true,
});

const form = ref<ProductInput>(emptyForm());

const { data, pending, error, refresh } = await useAsyncData(
  "admin-products",
  () => $fetch<{ items: Product[] }>("/api/products"),
  { server: true },
);

const products = computed(() => data.value?.items || []);
const errorText = computed(() => (error.value as any)?.statusMessage || (error.value as any)?.message || "");
const filteredProducts = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return products.value;
  return products.value.filter((item) => [item.name, item.note, item.category, item.size].join(" ").toLowerCase().includes(q));
});

const inStockCount = computed(() => products.value.filter((item) => item.inStock).length);
const outOfStockCount = computed(() => products.value.filter((item) => !item.inStock).length);
const avgPrice = computed(() => {
  if (!products.value.length) return 0;
  const total = products.value.reduce((sum, item) => sum + item.price, 0);
  return Math.round(total / products.value.length);
});
const canSubmit = computed(() =>
  form.value.name.trim() &&
  form.value.image.trim() &&
  form.value.note.trim() &&
  form.value.size.trim() &&
  Number.isFinite(form.value.price) &&
  form.value.price >= 0,
);

const currency = (value: number) => `KES ${value}`;

function resetForm() {
  editingId.value = null;
  form.value = emptyForm();
  formError.value = "";
}

function startEdit(product: Product) {
  editingId.value = product.id;
  form.value = {
    name: product.name,
    price: product.price,
    image: product.image,
    note: product.note,
    size: product.size,
    category: product.category,
    badge: product.badge || "",
    inStock: product.inStock,
  };
}

async function saveProduct() {
  formError.value = "";
  successText.value = "";
  if (!canSubmit.value) {
    formError.value = "Please fill all required fields correctly.";
    return;
  }

  isSaving.value = true;
  try {
    if (editingId.value) {
      await $fetch(`/api/products/${editingId.value}`, {
        method: "PUT",
        body: { ...form.value, category: form.value.category as ProductCategory },
      });
      successText.value = "Product updated successfully.";
    } else {
      await $fetch("/api/products", {
        method: "POST",
        body: { ...form.value, category: form.value.category as ProductCategory },
      });
      successText.value = "Product created successfully.";
    }
    resetForm();
    activeTab.value = "products";
    await refresh();
  } catch (err: any) {
    formError.value = err?.data?.message || err?.statusMessage || "Could not save product.";
  } finally {
    isSaving.value = false;
  }
}

async function toggleStock(product: Product) {
  successText.value = "";
  isMutating.value = true;
  try {
    await $fetch(`/api/products/${product.id}`, {
      method: "PUT",
      body: { inStock: !product.inStock },
    });
    successText.value = product.inStock ? "Product marked out of stock." : "Product restocked.";
    await refresh();
  } finally {
    isMutating.value = false;
  }
}

async function removeProduct(id: string) {
  if (!confirm("Delete this product?")) return;
  successText.value = "";
  isMutating.value = true;
  try {
    await $fetch(`/api/products/${id}`, { method: "DELETE" });
    if (editingId.value === id) resetForm();
    successText.value = "Product deleted successfully.";
    await refresh();
  } finally {
    isMutating.value = false;
  }
}

function onImagePreviewError(event: Event) {
  (event.target as HTMLImageElement).style.display = "none";
}
</script>

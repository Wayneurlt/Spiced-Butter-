<template>
  <div class="min-h-screen bg-gray-900">
    <header class="sticky top-0 z-20 backdrop-blur bg-gray-900/80 border-b border-white/10">
      <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 class="text-xl md:text-2xl font-semibold text-white">Admin Dashboard</h1>
        <button class="px-4 py-2 text-sm bg-pink-600 text-white rounded-md shadow-sm hover:bg-pink-700 active:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-pink-400/50" @click="logout()">Logout</button>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 py-4 md:py-6">
      <!-- Filters Row -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-end">
        <div class="md:col-span-6">
          <label class="block text-xs text-gray-300 mb-1">Search</label>
          <input
            v-model="search"
            type="text"
            placeholder="Search by name, handle, or phone"
            class="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-500"
          />
        </div>
        <div class="md:col-span-3">
          <label class="block text-xs text-gray-300 mb-1">Gender</label>
          <select v-model="gender" class="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-500">
            <option value="">All genders</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="md:col-span-3 flex gap-2">
          <div class="flex-1">
            <label class="block text-xs text-gray-300 mb-1">Page size</label>
            <select v-model.number="pageSize" class="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-500">
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
          </div>
          <div class="flex items-end pb-0.5 gap-2">
            <button class="px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400/40" @click="resetFilters">Reset</button>
            <button class="px-4 py-2 bg-pink-600 text-white rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400/50" @click="refresh()">Reload</button>
            <button class="px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400/40" @click="exportCsv">Export CSV</button>
          </div>
        </div>
      </div>

      <div class="mt-2 min-h-[1.25rem] flex items-center gap-3">
        <span v-if="loading" class="text-xs text-gray-300">Loading…</span>
        <span v-if="errorText" class="text-xs text-red-300">{{ errorText }}</span>
      </div>

      <div class="mb-2 grid grid-cols-1 md:grid-cols-4 gap-3 md:items-center">
        <input
          v-model="search"
          type="text"
          placeholder="Search by name, handle, or phone"
          class="w-full md:w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
        />
        <select v-model="gender" class="p-2 border border-gray-300 rounded">
          <option value="">All genders</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        <div class="flex gap-2">
          <button
            class="px-4 py-2 bg-gray-100 rounded border border-gray-300"
            @click="resetFilters"
          >Reset</button>
          <button
            class="px-4 py-2 bg-gray-100 rounded border border-gray-300"
            @click="exportCsv"
          >Export CSV</button>
        </div>
        <div class="flex items-center gap-2">
          <label class="text-white">Page size</label>
          <select v-model.number="pageSize" class="p-2 border border-gray-300 rounded">
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </div>
      </div>
      <div class="mb-4 flex items-center gap-2">
        <button class="px-3 py-1 bg-gray-100 rounded border" @click="refresh()">Reload</button>
        <span v-if="loading" class="text-sm text-gray-400">Loading…</span>
        <span v-if="errorText" class="text-sm text-red-400">{{ errorText }}</span>
      </div>

      <!-- Stat Cards -->
      <div v-if="meta" class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        <div class="p-3 rounded border border-white/10 bg-white/5">
          <div class="text-xs text-gray-300">Total</div>
          <div class="text-2xl font-semibold text-white">{{ meta.total }}</div>
        </div>
        <div class="p-3 rounded border border-white/10 bg-white/5">
          <div class="text-xs text-gray-300">Female</div>
          <div class="text-2xl font-semibold text-white">{{ meta.counts.female }}</div>
        </div>
        <div class="p-3 rounded border border-white/10 bg-white/5">
          <div class="text-xs text-gray-300">Male</div>
          <div class="text-2xl font-semibold text-white">{{ meta.counts.male }}</div>
        </div>
        <div class="p-3 rounded border border-white/10 bg-white/5">
          <div class="text-xs text-gray-300">Other</div>
          <div class="text-2xl font-semibold text-white">{{ meta.counts.other }}</div>
        </div>
      </div>

      <!-- Applicants quick list -->
      <div v-if="applications.length" class="mt-6 mb-4 p-3 rounded border border-white/10 bg-white/5">
        <div class="text-sm text-gray-300 mb-2">Applicants</div>
        <div class="flex flex-wrap gap-2 max-h-28 overflow-auto">
          <button
            v-for="a in applications"
            :key="a.id"
            class="px-2 py-1 rounded bg-pink-600/20 text-pink-100 hover:bg-pink-600/30 text-xs"
            @click="select(a.id)"
            :title="a.fullName"
          >
            {{ a.fullName }}
          </button>
        </div>
      </div>

      <div v-if="!loading && applications.length === 0" class="text-gray-400 text-sm mt-6">No applications found.</div>

      <!-- Desktop table -->
      <div class="hidden md:block mt-4 overflow-x-auto rounded border border-white/10">
        <table class="min-w-full text-sm text-left text-gray-300">
          <thead class="bg-white/5 text-gray-400 text-xs uppercase">
            <tr>
              <th class="px-4 py-3">Name</th>
              <th class="px-4 py-3">Age</th>
              <th class="px-4 py-3">Gender</th>
              <th class="px-4 py-3">Handle</th>
              <th class="px-4 py-3">Created</th>
              <th class="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="app in applications" :key="app.id" class="border-t border-white/10 hover:bg-white/5">
              <td class="px-4 py-3 font-medium text-white">{{ app.fullName }}</td>
              <td class="px-4 py-3">{{ app.age }}</td>
              <td class="px-4 py-3 capitalize">{{ app.gender }}</td>
              <td class="px-4 py-3">@{{ app.socialMedia || 'n/a' }}</td>
              <td class="px-4 py-3">{{ formatDate(app.createdAt) }}</td>
              <td class="px-4 py-3 flex gap-2">
                <button class="px-2 py-1 bg-pink-600 text-white rounded hover:bg-pink-700" @click="select(app.id)">View</button>
                <button class="px-2 py-1 bg-gray-800 text-white rounded border border-white/10 hover:bg-gray-700" @click="copyContact(app)">Copy</button>
                <button class="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700" @click="onDelete(app.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile cards -->
      <div class="md:hidden grid grid-cols-1 gap-3 mt-4">
        <div v-for="app in applications" :key="app.id" class="rounded border border-white/10 bg-white/5 p-3">
          <div class="flex items-center justify-between">
            <div class="font-medium text-white">{{ app.fullName }}</div>
            <div class="text-xs text-gray-400">{{ formatDate(app.createdAt) }}</div>
          </div>
          <div class="text-xs text-gray-400">@{{ app.socialMedia || 'n/a' }}</div>
          <div class="text-sm text-gray-300 mt-1">{{ app.age }} • {{ app.gender }}</div>
          <div class="mt-2 flex gap-2">
            <button class="px-2 py-1 bg-pink-600 text-white rounded text-xs" @click="select(app.id)">View</button>
            <button class="px-2 py-1 bg-gray-800 text-white rounded border border-white/10 text-xs" @click="copyContact(app)">Copy</button>
            <button class="px-2 py-1 bg-red-600 text-white rounded text-xs" @click="onDelete(app.id)">Delete</button>
          </div>
        </div>
      </div>

      <div v-if="meta" class="mt-6 flex items-center gap-3">
        <button :disabled="meta.page === 1" class="px-3 py-2 bg-gray-800 text-white rounded border border-white/10 disabled:opacity-50" @click="prevPage">Prev</button>
        <div class="text-white text-sm">Page {{ meta.page }} / {{ meta.totalPages }}</div>
        <button :disabled="meta.page === meta.totalPages" class="px-3 py-2 bg-gray-800 text-white rounded border border-white/10 disabled:opacity-50" @click="nextPage">Next</button>
      </div>

      <div v-if="selected" class="mt-8 border rounded p-4 bg-white/10">
        <div class="flex items-start gap-4">
          <img
            v-if="selected.photoDataUrl"
            :src="selected.photoDataUrl"
            alt="photo"
            class="w-28 h-28 object-cover rounded"
          />
          <div>
            <h3 class="text-xl font-semibold text-white">{{ selected.fullName }}</h3>
            <div class="text-sm text-gray-400">{{ selected.age }} • {{ selected.gender }}</div>
            <div class="text-sm text-gray-400">Handle: @{{ selected.socialMedia || 'n/a' }}</div>
            <div class="text-sm text-gray-400">Phone: {{ selected.phoneNumber }}</div>
            <div class="text-sm text-gray-400">Cooking: {{ selected.cookingSkills }}/5</div>
            <div class="text-sm text-gray-400">Body Count Tier: {{ selected.bodyCount }}</div>
            <div class="text-sm text-gray-400">Communicate: {{ selected.communicate }}</div>
            <div class="text-sm text-gray-400">Pet: {{ selected.petPreference || 'n/a' }}</div>
          </div>
        </div>
        <div class="mt-4">
          <div class="text-white font-semibold mb-1">Bio</div>
          <p class="text-gray-200 whitespace-pre-line">{{ selected.bio }}</p>
        </div>
        <div class="mt-4">
          <div class="text-white font-semibold mb-1">Interests</div>
          <p class="text-gray-200 whitespace-pre-line">{{ selected.interests }}</p>
        </div>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div class="text-white font-semibold mb-1">Brings to table</div>
            <p class="text-gray-200">{{ selected.table || '—' }}</p>
          </div>
          <div>
            <div class="text-white font-semibold mb-1">Ideal Date</div>
            <p class="text-gray-200">{{ selected.idealDate || '—' }}</p>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <button class="px-3 py-2 text-sm bg-red-600 text-white rounded" @click="onDelete(selected.id)">Delete</button>
          <button class="px-3 py-2 text-sm bg-gray-700 text-white rounded" @click="selectedId = ''">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });

import { ref, computed, watch } from "vue";
import { useRoute, useRouter, useAsyncData, useRequestURL } from "#app";
import type { ApplicationRecord } from "~/composables/useApplications";
import { useAdminAuth } from "~/composables/useAdminAuth";

const { logout } = useAdminAuth();
const route = useRoute();
const router = useRouter();

const search = ref("");
const gender = ref("");
const page = ref(1);
const pageSize = ref<number>(10);
const selectedId = ref<string>("");
const selected = ref<ApplicationRecord | null>(null);

const reqUrl = useRequestURL();
const apiBase = process.client ? window.location.origin : `${reqUrl.protocol}//${reqUrl.host}`;

const { data, pending, error, refresh } = await useAsyncData(
  "applications",
  () =>
    $fetch<{ items: ApplicationRecord[]; meta: any }>("/api/applications", {
      baseURL: apiBase,
      params: {
        search: search.value || undefined,
        gender: gender.value || undefined,
        page: page.value,
        pageSize: pageSize.value,
      },
    }),
  { watch: [search, gender, page, pageSize], server: true }
);

const applications = computed(() => data.value?.items || []);
const meta = computed(() => data.value?.meta || { page: 1, pageSize: pageSize.value, total: 0, totalPages: 1, counts: { female: 0, male: 0, other: 0 } });
const loading = computed(() => pending.value);
const errorText = computed(() => (error.value as any)?.data?.message || (error.value as any)?.message || "");

function resetFilters() {
  search.value = "";
  gender.value = "";
  page.value = 1;
}

async function select(id: string) {
  selectedId.value = id;
  selected.value = await $fetch<ApplicationRecord>(`/api/applications/${id}`, { baseURL: apiBase });
}

async function onDelete(id: string) {
  if (confirm("Delete this application?")) {
    await $fetch(`/api/applications/${id}`, { method: "DELETE", baseURL: apiBase });
    if (selectedId.value === id) selectedId.value = "";
    refresh();
  }
}

function formatDate(iso?: string) {
  try {
    return new Date(iso as string).toLocaleString();
  } catch {
    return iso || '';
  }
}

function nextPage() {
  if (meta.value && meta.value.page < meta.value.totalPages) {
    page.value = meta.value.page + 1;
  }
}

function prevPage() {
  if (meta.value && meta.value.page > 1) {
    page.value = meta.value.page - 1;
  }
}

function copyContact(app: ApplicationRecord) {
  const text = `${app.fullName} | ${app.phoneNumber} | @${app.socialMedia || 'n/a'}`;
  navigator.clipboard.writeText(text);
}

function exportCsv() {
  const rows = [
    [
      'id','createdAt','fullName','phoneNumber','age','gender','bio','interests','bringsTable','idealDate','cookingSkills','communicate','bodyCount','socialMedia','petPreference','communicationStyle'
    ],
    ...applications.value.map(a => [
      a.id, a.createdAt || '', a.fullName, a.phoneNumber, a.age, a.gender, a.bio, a.interests, a.table || '', a.idealDate || '', a.cookingSkills, a.communicate, a.bodyCount, a.socialMedia || '', a.petPreference || '', a.communicationStyle
    ])
  ];
  const csv = rows.map(r => r.map(v => `"${String(v ?? '').replaceAll('"','""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `applications_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

if (route.query.id && typeof route.query.id === 'string') {
  select(route.query.id);
  router.replace({ path: "/admin" });
}
</script>

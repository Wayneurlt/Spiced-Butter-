import { ref } from "vue";

export type ApplicationRecord = {
  id: string;
  fullName: string;
  phoneNumber: string;
  age: number;
  gender: string;
  bio: string;
  interests: string;
  table?: string;
  idealDate?: string;
  cookingSkills: number;
  communicate: string;
  bodyCount: number;
  socialMedia?: string;
  petPreference?: string;
  communicationStyle: string;
  photoDataUrl?: string | null;
  createdAt?: string;
};

export function useApplications() {
  const applications = ref<ApplicationRecord[]>([]);
  const meta = ref<{ page: number; pageSize: number; total: number; totalPages: number; counts: { female: number; male: number; other: number } } | null>(null);

  async function refresh(params?: { search?: string; gender?: string; page?: number; pageSize?: number }) {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.gender) query.set("gender", params.gender);
    query.set("page", String(params?.page || meta.value?.page || 1));
    query.set("pageSize", String(params?.pageSize || meta.value?.pageSize || 10));
    const res = await $fetch<{ items: ApplicationRecord[]; meta: any }>(`/api/applications?${query.toString()}`);
    applications.value = res.items || [];
    meta.value = res.meta || null;
  }

  async function add(app: Omit<ApplicationRecord, "id" | "createdAt">) {
    const idRes = await $fetch<{ id: string }>("/api/applications", {
      method: "POST",
      body: app,
    });
    await refresh();
    return idRes.id;
  }

  async function remove(id: string) {
    await $fetch(`/api/applications/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function getById(id: string) {
    return await $fetch<ApplicationRecord>(`/api/applications/${id}`);
  }

  return { applications, meta, refresh, add, remove, getById };
}

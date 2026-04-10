import { _ as __nuxt_component_0 } from './nuxt-link-C5glHiGM.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { u as useAdminAuth } from './useAdminAuth-BUCdWZ1O.mjs';
import { u as useAsyncData } from './asyncData-B2riqgur.mjs';
import '../_/nitro.mjs';
import '@prisma/client';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:url';
import '@iconify/utils';
import 'consola/core';
import 'node:module';
import './server.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useAdminAuth();
    const activeTab = ref("overview");
    const search = ref("");
    const editingId = ref(null);
    const isSaving = ref(false);
    const isMutating = ref(false);
    const formError = ref("");
    const successText = ref("");
    const emptyForm = () => ({
      name: "",
      price: 0,
      image: "",
      note: "",
      description: "",
      size: "",
      category: "hot",
      badge: "",
      inStock: true
    });
    const form = ref(emptyForm());
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "admin-products",
      () => $fetch("/api/products"),
      { server: true }
    )), __temp = await __temp, __restore(), __temp);
    const products = computed(() => {
      var _a;
      return ((_a = data.value) == null ? undefined : _a.items) || [];
    });
    const errorText = computed(() => {
      var _a, _b;
      return ((_a = error.value) == null ? undefined : _a.statusMessage) || ((_b = error.value) == null ? undefined : _b.message) || "";
    });
    const filteredProducts = computed(() => {
      const q = search.value.trim().toLowerCase();
      if (!q) return products.value;
      return products.value.filter((item) => [item.name, item.note, item.description, item.category, item.size].join(" ").toLowerCase().includes(q));
    });
    const inStockCount = computed(() => products.value.filter((item) => item.inStock).length);
    const outOfStockCount = computed(() => products.value.filter((item) => !item.inStock).length);
    const avgPrice = computed(() => {
      if (!products.value.length) return 0;
      const total = products.value.reduce((sum, item) => sum + item.price, 0);
      return Math.round(total / products.value.length);
    });
    const canSubmit = computed(
      () => form.value.name.trim() && form.value.image.trim() && form.value.note.trim() && form.value.description.trim() && form.value.size.trim() && Number.isFinite(form.value.price) && form.value.price >= 0
    );
    const currency = (value) => `KES ${value}`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[var(--sb-cream)] text-[var(--sb-brown-deep)]" }, _attrs))}><div class="mx-auto max-w-7xl md:grid md:grid-cols-[250px_1fr] md:gap-6 md:px-4 md:py-6"><aside class="hidden md:block rounded-2xl border border-[#ddb57a] bg-[#fff5e4] p-4 h-[calc(100vh-3rem)] sticky top-6 overflow-auto"><p class="text-xs uppercase tracking-wide text-[#9a6a21]">Spiced Butter</p><h1 class="text-xl font-bold mb-6">Admin Panel</h1><nav class="space-y-2"><button class="${ssrRenderClass([unref(activeTab) === "overview" ? "bg-[var(--sb-brown)] text-white" : "hover:bg-[#f7e2c1]", "w-full text-left rounded-lg px-3 py-2 font-medium"])}">Overview</button><button class="${ssrRenderClass([unref(activeTab) === "products" ? "bg-[var(--sb-brown)] text-white" : "hover:bg-[#f7e2c1]", "w-full text-left rounded-lg px-3 py-2 font-medium"])}">Products</button><button class="${ssrRenderClass([unref(activeTab) === "create" ? "bg-[var(--sb-brown)] text-white" : "hover:bg-[#f7e2c1]", "w-full text-left rounded-lg px-3 py-2 font-medium"])}">${ssrInterpolate(unref(editingId) ? "Edit Product" : "Add Product")}</button></nav><div class="mt-8 border-t border-[#e2c08d] pt-4 space-y-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "block rounded-lg px-3 py-2 border border-[#c69451] text-center hover:bg-[#f7e2c1]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View Store`);
          } else {
            return [
              createTextVNode("View Store")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="w-full rounded-lg px-3 py-2 bg-[var(--sb-brown)] text-white">Logout</button></div></aside><main class="min-w-0 pb-36 md:pb-0">`);
      if (unref(activeTab) === "overview") {
        _push(`<section class="space-y-4 px-4 pt-4 md:px-0 md:pt-0"><h2 class="text-xl font-bold">Overview</h2><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"><div class="rounded-xl border border-[#ddb57a] bg-[#fff5e4] p-4"><p class="text-xs text-[#9a6a21]">Total Products</p><p class="text-2xl font-bold">${ssrInterpolate(unref(products).length)}</p></div><div class="rounded-xl border border-[#ddb57a] bg-[#fff5e4] p-4"><p class="text-xs text-[#9a6a21]">In Stock</p><p class="text-2xl font-bold text-emerald-700">${ssrInterpolate(unref(inStockCount))}</p></div><div class="rounded-xl border border-[#ddb57a] bg-[#fff5e4] p-4"><p class="text-xs text-[#9a6a21]">Out of Stock</p><p class="text-2xl font-bold text-red-700">${ssrInterpolate(unref(outOfStockCount))}</p></div><div class="rounded-xl border border-[#ddb57a] bg-[#fff5e4] p-4"><p class="text-xs text-[#9a6a21]">Avg. Price</p><p class="text-2xl font-bold">${ssrInterpolate(currency(unref(avgPrice)))}</p></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeTab) === "create") {
        _push(`<section class="space-y-4 px-4 pt-4 md:px-0"><h2 class="text-xl font-bold">${ssrInterpolate(unref(editingId) ? "Edit Product" : "Add Product")}</h2><form class="rounded-2xl border border-[#ddb57a] bg-[#fff5e4] p-4 grid grid-cols-1 md:grid-cols-2 gap-3"><input${ssrRenderAttr("value", unref(form).name)} class="p-2 bg-white border border-[#d7b07a] rounded" placeholder="Name" required><input${ssrRenderAttr("value", unref(form).price)} type="number" min="0" class="p-2 bg-white border border-[#d7b07a] rounded" placeholder="Price (KES)" required><input${ssrRenderAttr("value", unref(form).image)} class="p-2 bg-white border border-[#d7b07a] rounded" placeholder="Image URL" required><input${ssrRenderAttr("value", unref(form).size)} class="p-2 bg-white border border-[#d7b07a] rounded" placeholder="Size" required><input${ssrRenderAttr("value", unref(form).badge)} class="p-2 bg-white border border-[#d7b07a] rounded" placeholder="Badge (optional)"><select class="p-2 bg-white border border-[#d7b07a] rounded"><option value="hot"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "hot") : ssrLooseEqual(unref(form).category, "hot")) ? " selected" : ""}>Hot</option><option value="sweet"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "sweet") : ssrLooseEqual(unref(form).category, "sweet")) ? " selected" : ""}>Sweet</option><option value="tangy"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "tangy") : ssrLooseEqual(unref(form).category, "tangy")) ? " selected" : ""}>Tangy</option><option value="savory"${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "savory") : ssrLooseEqual(unref(form).category, "savory")) ? " selected" : ""}>Savory</option></select><textarea class="md:col-span-2 p-2 bg-white border border-[#d7b07a] rounded" rows="2" placeholder="Short note (front of card)" required>${ssrInterpolate(unref(form).note)}</textarea><textarea class="md:col-span-2 p-2 bg-white border border-[#d7b07a] rounded" rows="4" placeholder="Detailed description (back of card)" required>${ssrInterpolate(unref(form).description)}</textarea>`);
        if (unref(form).image) {
          _push(`<div class="md:col-span-2 rounded border border-[#e7cba4] bg-white p-2 flex items-center gap-3"><img${ssrRenderAttr("src", unref(form).image)} alt="preview" class="w-12 h-12 rounded object-cover border border-[#e7cba4]"><span class="text-xs text-[#9a6a21]">Image preview</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<label class="text-sm flex items-center gap-2"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).inStock) ? ssrLooseContain(unref(form).inStock, null) : unref(form).inStock) ? " checked" : ""} type="checkbox">In stock</label><div class="md:col-span-2 flex flex-wrap gap-2"><button class="px-4 py-2 rounded bg-[var(--sb-brown)] text-white disabled:opacity-60"${ssrIncludeBooleanAttr(unref(pending) || unref(isSaving) || !unref(canSubmit)) ? " disabled" : ""}>${ssrInterpolate(unref(isSaving) ? "Saving..." : unref(editingId) ? "Update Product" : "Create Product")}</button>`);
        if (unref(editingId)) {
          _push(`<button class="px-4 py-2 rounded border border-[#c69451]" type="button">Cancel Edit</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (unref(formError)) {
          _push(`<p class="md:col-span-2 text-sm text-red-700">${ssrInterpolate(unref(formError))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form></section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeTab) === "products") {
        _push(`<section class="space-y-4 px-4 pt-4 md:px-0"><div class="flex flex-wrap gap-2 items-center justify-between"><h2 class="text-xl font-bold">Manage Products</h2><div class="flex gap-2 w-full md:w-auto"><input${ssrRenderAttr("value", unref(search))} class="flex-1 md:w-80 p-2 bg-white border border-[#d7b07a] rounded" placeholder="Search products..."><button class="px-4 py-2 rounded border border-[#c69451] hover:bg-[#f7e2c1] whitespace-nowrap">Reload</button></div></div><div class="rounded-2xl border border-[#ddb57a] bg-[#fff5e4] overflow-hidden"><div class="hidden md:block overflow-x-auto"><table class="min-w-[760px] w-full text-sm text-left"><thead class="bg-[#f3ddba] text-[#7a4900] uppercase text-xs"><tr><th class="px-4 py-3">Product</th><th class="px-4 py-3">Category</th><th class="px-4 py-3">Price</th><th class="px-4 py-3">Stock</th><th class="px-4 py-3">Actions</th></tr></thead><tbody><!--[-->`);
        ssrRenderList(unref(filteredProducts), (product) => {
          _push(`<tr class="border-t border-[#edd3ae]"><td class="px-4 py-3"><div class="font-semibold">${ssrInterpolate(product.name)}</div><div class="text-xs text-[#9a6a21]">${ssrInterpolate(product.size)} - ${ssrInterpolate(product.note)}</div></td><td class="px-4 py-3 capitalize">${ssrInterpolate(product.category)}</td><td class="px-4 py-3">${ssrInterpolate(currency(product.price))}</td><td class="px-4 py-3"><span class="${ssrRenderClass(product.inStock ? "text-emerald-700" : "text-red-700")}">${ssrInterpolate(product.inStock ? "In stock" : "Out of stock")}</span></td><td class="px-4 py-3"><div class="flex flex-wrap gap-2"><button class="px-2 py-1 rounded border border-[#c69451] disabled:opacity-60"${ssrIncludeBooleanAttr(unref(isMutating)) ? " disabled" : ""}>Edit</button><button class="px-2 py-1 rounded bg-[#a5650f] text-white disabled:opacity-60"${ssrIncludeBooleanAttr(unref(isMutating)) ? " disabled" : ""}>${ssrInterpolate(product.inStock ? "Set Out" : "Restock")}</button><button class="px-2 py-1 rounded bg-red-700 text-white disabled:opacity-60"${ssrIncludeBooleanAttr(unref(isMutating)) ? " disabled" : ""}>Delete</button></div></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div>`);
        if (!unref(pending) && unref(filteredProducts).length === 0) {
          _push(`<div class="p-6 text-center text-[#9a6a21]"> No products found for this filter. </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="md:hidden p-3 space-y-3"><!--[-->`);
        ssrRenderList(unref(filteredProducts), (product) => {
          _push(`<div class="rounded-xl border border-[#e7cba4] bg-white p-3"><div class="font-semibold">${ssrInterpolate(product.name)}</div><div class="text-xs text-[#9a6a21]">${ssrInterpolate(product.category)} - ${ssrInterpolate(product.size)}</div><div class="text-sm mt-1">${ssrInterpolate(currency(product.price))}</div><div class="${ssrRenderClass([product.inStock ? "text-emerald-700" : "text-red-700", "text-sm mt-1"])}">${ssrInterpolate(product.inStock ? "In stock" : "Out of stock")}</div><div class="mt-2 flex gap-2"><button class="px-2 py-1 text-xs rounded border border-[#c69451] disabled:opacity-60"${ssrIncludeBooleanAttr(unref(isMutating)) ? " disabled" : ""}>Edit</button><button class="px-2 py-1 text-xs rounded bg-[#a5650f] text-white disabled:opacity-60"${ssrIncludeBooleanAttr(unref(isMutating)) ? " disabled" : ""}>${ssrInterpolate(product.inStock ? "Set Out" : "Restock")}</button><button class="px-2 py-1 text-xs rounded bg-red-700 text-white disabled:opacity-60"${ssrIncludeBooleanAttr(unref(isMutating)) ? " disabled" : ""}>Delete</button></div></div>`);
        });
        _push(`<!--]--></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(pending)) {
        _push(`<p class="px-4 md:px-0 text-[#9a6a21] text-sm">Loading products...</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(errorText)) {
        _push(`<p class="px-4 md:px-0 text-red-700 text-sm">${ssrInterpolate(unref(errorText))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(successText)) {
        _push(`<p class="px-4 md:px-0 text-emerald-700 text-sm">${ssrInterpolate(unref(successText))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main><nav class="md:hidden fixed bottom-0 inset-x-0 border-t border-[#d9b47f] bg-[#fff4e0] px-4 py-2 z-30 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-6px_16px_rgba(93,55,0,0.16)]"><div class="grid grid-cols-3 gap-2"><button aria-label="Overview" title="Overview" class="${ssrRenderClass([unref(activeTab) === "overview" ? "bg-[var(--sb-brown)] text-white" : "bg-transparent text-[#7a4900]", "rounded-md py-2.5 flex items-center justify-center"])}"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l9-8 9 8"></path><path d="M5 10v10h14V10"></path></svg></button><button aria-label="Products" title="Products" class="${ssrRenderClass([unref(activeTab) === "products" ? "bg-[var(--sb-brown)] text-white" : "bg-transparent text-[#7a4900]", "rounded-md py-2.5 flex items-center justify-center"])}"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="6" rx="1"></rect><rect x="3" y="14" width="18" height="6" rx="1"></rect></svg></button><button${ssrRenderAttr("aria-label", unref(editingId) ? "Edit Product" : "Add Product")}${ssrRenderAttr("title", unref(editingId) ? "Edit Product" : "Add Product")} class="${ssrRenderClass([unref(activeTab) === "create" ? "bg-[var(--sb-brown)] text-white" : "bg-transparent text-[#7a4900]", "rounded-md py-2.5 flex items-center justify-center"])}">`);
      if (!unref(editingId)) {
        _push(`<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>`);
      } else {
        _push(`<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h4l10-10-4-4L4 16v4z"></path></svg>`);
      }
      _push(`</button></div></nav></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=admin-BRy_Ab0a.mjs.map

import { u as useStorefront, _ as _sfc_main$1 } from './StoreHeader-C4nFmIWL.mjs';
import { defineComponent, ref, withAsyncContext, watchEffect, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAsyncData } from './asyncData-B2riqgur.mjs';
import './nuxt-link-C5glHiGM.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { products, setProducts, cart, increase, decrease, currency } = useStorefront();
    const activeCategory = ref("all");
    const flippedProductId = ref(null);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "storefront-products",
      () => $fetch("/api/products"),
      { server: true }
    )), __temp = await __temp, __restore(), __temp);
    watchEffect(() => {
      var _a;
      if ((_a = data.value) == null ? undefined : _a.items) {
        setProducts(data.value.items);
      }
    });
    const filteredProducts = computed(
      () => activeCategory.value === "all" ? products.value : products.value.filter((product) => product.category === activeCategory.value)
    );
    function closeFlip() {
      flippedProductId.value = null;
    }
    watch(activeCategory, () => {
      closeFlip();
    });
    watch(flippedProductId, (id) => {
      return;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StoreHeader = _sfc_main$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "sb-page" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_StoreHeader, null, null, _parent));
      _push(`<section class="sb-hero"><div class="sb-hero__overlay"><h1 class="sb-hero__heading">About</h1><p class="sb-hero__description"> Spiced Butter is a celebration of bold flavors and thoughtful craftsmanship. Our range of lovingly handmade condiments and relishes is created in small batches using carefully selected, fresh, locally sourced ingredients bringing you bold, authentic tastes, delivering freshness and quality in every jar. Rooted in home cooking and inspired by vibrant tastes, Spiced Butter is your companion in turning everyday dishes into memorable experiences. </p></div></section><section class="sb-content sb-content--catalogue"><div class="sb-filters"><button type="button" class="${ssrRenderClass([{ "sb-chip--active": unref(activeCategory) === "all" }, "sb-chip"])}"> All </button><button type="button" class="${ssrRenderClass([{ "sb-chip--active": unref(activeCategory) === "hot" }, "sb-chip"])}"> Hot </button><button type="button" class="${ssrRenderClass([{ "sb-chip--active": unref(activeCategory) === "sweet" }, "sb-chip"])}"> Sweet </button><button type="button" class="${ssrRenderClass([{ "sb-chip--active": unref(activeCategory) === "tangy" }, "sb-chip"])}"> Tangy </button><button type="button" class="${ssrRenderClass([{ "sb-chip--active": unref(activeCategory) === "savory" }, "sb-chip"])}"> Savory </button></div><div class="sb-grid"><!--[-->`);
      ssrRenderList(unref(filteredProducts), (product) => {
        _push(`<article class="${ssrRenderClass([{ "sb-card--flipped": unref(flippedProductId) === product.id }, "sb-card"])}"><div class="sb-card__inner"><div class="sb-card__face sb-card__face--front">`);
        if (product.badge) {
          _push(`<span class="sb-card__badge">${ssrInterpolate(product.badge)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="sb-card__media"><img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="sb-card__image"></div><div class="sb-card__meta"><div class="sb-card__info"><h2 class="sb-card__name">${ssrInterpolate(product.name)}</h2><p class="sb-card__note">${ssrInterpolate(product.note)}</p><p class="sb-card__size">${ssrInterpolate(product.size)}</p><p class="sb-card__price">${ssrInterpolate(unref(currency)(product.price))}</p>`);
        if (!product.inStock) {
          _push(`<p class="sb-card__note text-red-300">Out of stock</p>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(cart)[product.id] > 0) {
          _push(`<p class="sb-card__line-total"> Line total: ${ssrInterpolate(unref(currency)(unref(cart)[product.id] * product.price))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="sb-card__controls"><button type="button" class="sb-qty"${ssrIncludeBooleanAttr(unref(cart)[product.id] === 0 || !product.inStock) ? " disabled" : ""}> - </button><span class="sb-qty__value">${ssrInterpolate(unref(cart)[product.id])}</span><button type="button" class="sb-qty"${ssrIncludeBooleanAttr(!product.inStock) ? " disabled" : ""}>+</button></div></div><div class="sb-card__action-bar sb-card__action-bar--front"><span class="sb-card__action-hint">Full story</span><button type="button" class="sb-card__action-btn"${ssrRenderAttr("aria-expanded", unref(flippedProductId) === product.id)}${ssrRenderAttr("aria-controls", "card-back-" + product.id)}> Details </button></div></div><div class="sb-card__face sb-card__face--back"><div class="sb-card__back-body"${ssrRenderAttr("id", "card-back-" + product.id)} role="region"${ssrRenderAttr("aria-labelledby", "card-back-title-" + product.id)}><h3${ssrRenderAttr("id", "card-back-title-" + product.id)} class="sb-card__back-title">${ssrInterpolate(product.name)}</h3><p class="sb-card__back-copy">${ssrInterpolate(product.description || product.note)}</p></div><div class="sb-card__action-bar sb-card__action-bar--back"><button type="button" class="sb-card__action-btn sb-card__action-btn--secondary"> Back </button><div class="sb-card__controls"><button type="button" class="sb-qty"${ssrIncludeBooleanAttr(unref(cart)[product.id] === 0 || !product.inStock) ? " disabled" : ""}> - </button><span class="sb-qty__value">${ssrInterpolate(unref(cart)[product.id])}</span><button type="button" class="sb-qty"${ssrIncludeBooleanAttr(!product.inStock) ? " disabled" : ""}>+</button></div></div></div></div></article>`);
      });
      _push(`<!--]--></div></section></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-RFWwk6f7.mjs.map

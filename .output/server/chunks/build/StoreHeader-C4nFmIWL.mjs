import { _ as __nuxt_component_0 } from './nuxt-link-C5glHiGM.mjs';
import { computed, useSSRContext, defineComponent, ref, mergeProps, withCtx, createVNode, unref, openBlock, createBlock, toDisplayString, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { c as useState, d as _imports_0 } from './server.mjs';

const buildDefaultCart = (products) => products.reduce((acc, product) => {
  acc[product.id] = 0;
  return acc;
}, {});
const useStorefront = () => {
  const MAX_ITEM_QUANTITY = 20;
  const products = useState("sb-products", () => []);
  const cart = useState("sb-cart", () => ({}));
  const setProducts = (items) => {
    products.value = items;
    const nextCart = { ...cart.value };
    for (const product of items) {
      if (typeof nextCart[product.id] !== "number") {
        nextCart[product.id] = 0;
      }
    }
    for (const existingId of Object.keys(nextCart)) {
      if (!items.some((item) => item.id === existingId)) {
        delete nextCart[existingId];
      }
    }
    cart.value = nextCart;
  };
  const increase = (productId, step = 1) => {
    const target = products.value.find((item) => item.id === productId);
    if (!(target == null ? undefined : target.inStock)) {
      return;
    }
    const next = (cart.value[productId] || 0) + step;
    cart.value[productId] = Math.min(MAX_ITEM_QUANTITY, next);
  };
  const decrease = (productId) => {
    cart.value[productId] = Math.max(0, (cart.value[productId] || 0) - 1);
  };
  const clearCart = () => {
    cart.value = buildDefaultCart(products.value);
  };
  const selectedItems = computed(
    () => products.value.map((product) => ({
      ...product,
      quantity: cart.value[product.id] || 0
    })).filter((item) => item.quantity > 0)
  );
  const totalItems = computed(
    () => selectedItems.value.reduce((sum, item) => sum + item.quantity, 0)
  );
  const totalAmount = computed(
    () => selectedItems.value.reduce((sum, item) => sum + item.quantity * item.price, 0)
  );
  const currency = (value) => `KES ${value}`;
  return {
    products,
    setProducts,
    cart,
    increase,
    decrease,
    clearCart,
    selectedItems,
    totalItems,
    totalAmount,
    currency
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StoreHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const { selectedItems, totalItems, totalAmount, currency, increase, decrease } = useStorefront();
    const cartOpen = ref(false);
    function onCartTriggerClick(event) {
      if ((undefined).innerWidth <= 980 && !cartOpen.value) {
        event.preventDefault();
        cartOpen.value = true;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sb-header" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "sb-brand"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="Spiced Butter logo" class="sb-brand__logo"${_scopeId}><span class="sb-brand__text"${_scopeId}><span class="sb-brand__sub"${_scopeId}>Curated by M</span><span class="sb-brand__main"${_scopeId}>SPICED BUTTER</span></span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "Spiced Butter logo",
                class: "sb-brand__logo"
              }),
              createVNode("span", { class: "sb-brand__text" }, [
                createVNode("span", { class: "sb-brand__sub" }, "Curated by M"),
                createVNode("span", { class: "sb-brand__main" }, "SPICED BUTTER")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="sb-cart">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/checkout",
        class: "sb-cart__trigger",
        "aria-label": "View cart",
        onClick: onCartTriggerClick
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="sb-cart__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"${_scopeId}><path d="M3 4H5L7.4 14.6C7.51 15.08 7.87 15.42 8.36 15.5H18.7C19.16 15.5 19.56 15.2 19.7 14.76L21.5 9.2C21.7 8.58 21.23 8 20.58 8H6.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path><circle cx="9" cy="19" r="1.6" fill="currentColor"${_scopeId}></circle><circle cx="18" cy="19" r="1.6" fill="currentColor"${_scopeId}></circle></svg><span class="sb-cart__badge"${_scopeId}>${ssrInterpolate(unref(totalItems))}</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "sb-cart__icon",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                "aria-hidden": "true"
              }, [
                createVNode("path", {
                  d: "M3 4H5L7.4 14.6C7.51 15.08 7.87 15.42 8.36 15.5H18.7C19.16 15.5 19.56 15.2 19.7 14.76L21.5 9.2C21.7 8.58 21.23 8 20.58 8H6.2",
                  stroke: "currentColor",
                  "stroke-width": "1.8",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }),
                createVNode("circle", {
                  cx: "9",
                  cy: "19",
                  r: "1.6",
                  fill: "currentColor"
                }),
                createVNode("circle", {
                  cx: "18",
                  cy: "19",
                  r: "1.6",
                  fill: "currentColor"
                })
              ])),
              createVNode("span", { class: "sb-cart__badge" }, toDisplayString(unref(totalItems)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div style="${ssrRenderStyle(unref(cartOpen) ? null : { display: "none" })}" class="sb-cart__panel">`);
      if (unref(selectedItems).length === 0) {
        _push(`<p class="sb-cart__empty"> Your cart is empty. </p>`);
      } else {
        _push(`<ul class="sb-cart__list"><!--[-->`);
        ssrRenderList(unref(selectedItems), (item) => {
          _push(`<li class="sb-cart__item"><div class="sb-cart__item-main"><span>${ssrInterpolate(item.name)}</span><strong>${ssrInterpolate(unref(currency)(item.quantity * item.price))}</strong></div><div class="sb-cart__item-controls"><button type="button" class="sb-qty sb-qty--small"> - </button><span class="sb-qty__value">${ssrInterpolate(item.quantity)}</span><button type="button" class="sb-qty sb-qty--small"> + </button></div></li>`);
        });
        _push(`<!--]--></ul>`);
      }
      _push(`<div class="sb-cart__footer"><span>Total: ${ssrInterpolate(unref(currency)(unref(totalAmount)))}</span>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/checkout",
        class: "sb-cart__checkout"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Checkout`);
          } else {
            return [
              createTextVNode("Checkout")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></header>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StoreHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as _, useStorefront as u };
//# sourceMappingURL=StoreHeader-C4nFmIWL.mjs.map

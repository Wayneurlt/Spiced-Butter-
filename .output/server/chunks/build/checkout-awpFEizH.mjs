import { u as useStorefront, _ as _sfc_main$1 } from './StoreHeader-C4nFmIWL.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-C5glHiGM.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import './server.mjs';
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
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';

const WHATSAPP_NUMBER = "254704444389";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const { selectedItems, totalAmount, currency, clearCart, increase, decrease } = useStorefront();
    const whatsappMessage = computed(() => {
      const lines = [
        "Hello Spiced Butter, I would like to place an order:",
        "",
        ...selectedItems.value.map(
          (item) => `- ${item.name} x${item.quantity} = KES ${item.quantity * item.price}`
        ),
        "",
        `Total: KES ${totalAmount.value}`,
        "",
        "Please confirm availability and delivery details."
      ];
      return encodeURIComponent(lines.join("\n"));
    });
    const whatsappUrl = computed(
      () => `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage.value}`
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StoreHeader = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "sb-page" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_StoreHeader, null, null, _parent));
      _push(`<section class="sb-checkout-page"><div class="sb-checkout-card"><h1 class="sb-checkout-card__title">Checkout</h1><p class="sb-checkout-card__text"> Your order will be completed on WhatsApp. </p>`);
      if (unref(selectedItems).length === 0) {
        _push(`<p class="sb-checkout__empty"> Your cart is currently empty. Add condiments from the catalogue. </p>`);
      } else {
        _push(`<ul class="sb-checkout__list"><!--[-->`);
        ssrRenderList(unref(selectedItems), (item) => {
          _push(`<li class="sb-checkout__row"><div class="sb-checkout__item-main"><span>${ssrInterpolate(item.name)}</span><span>${ssrInterpolate(unref(currency)(item.quantity * item.price))}</span></div><div class="sb-checkout__item-controls"><button type="button" class="sb-qty">-</button><span class="sb-qty__value">${ssrInterpolate(item.quantity)}</span><button type="button" class="sb-qty">+</button></div></li>`);
        });
        _push(`<!--]--></ul>`);
      }
      _push(`<div class="sb-checkout__total"><span>Total</span><strong>${ssrInterpolate(unref(currency)(unref(totalAmount)))}</strong></div><div class="sb-checkout-card__actions">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "sb-back-catalogue"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u2190 Continue Shopping (Add More Products) `);
          } else {
            return [
              createTextVNode(" \u2190 Continue Shopping (Add More Products) ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a class="${ssrRenderClass([{ "sb-whatsapp--disabled": unref(selectedItems).length === 0 }, "sb-whatsapp"])}"${ssrRenderAttr("href", unref(selectedItems).length > 0 ? unref(whatsappUrl) : undefined)} target="_blank" rel="noopener noreferrer"> Confirm Order on WhatsApp </a><button type="button" class="sb-clear"> Clear Cart </button></div></div></section></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=checkout-awpFEizH.mjs.map

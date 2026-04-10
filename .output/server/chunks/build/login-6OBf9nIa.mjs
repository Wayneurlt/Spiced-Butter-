import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderDynamicModel, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a as useRouter, b as useRoute } from './server.mjs';
import { u as useAdminAuth } from './useAdminAuth-BUCdWZ1O.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    useAdminAuth();
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const isSubmitting = ref(false);
    const showPassword = ref(false);
    ref(0);
    const lockoutUntil = ref(null);
    const now = ref(Date.now());
    const canSubmit = computed(() => email.value.includes("@") && password.value.length >= 8);
    const isLockedOut = computed(() => !!lockoutUntil.value && now.value < lockoutUntil.value);
    const lockoutSecondsRemaining = computed(() => {
      if (!isLockedOut.value || !lockoutUntil.value) return 0;
      return Math.max(1, Math.ceil((lockoutUntil.value - now.value) / 1e3));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center p-6" }, _attrs))}><div class="w-full max-w-md bg-white/10 rounded-xl p-6 border border-white/10"><h1 class="text-xl font-bold text-pink-600 mb-4">Admin Login</h1><p class="text-sm text-gray-300 mb-4">Sign in to manage products and stock updates.</p><form class="space-y-4"><div><label class="block text-white mb-1">Email</label><input${ssrRenderAttr("value", email.value)} type="email" required autocomplete="email" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 bg-white"></div><div><label class="block text-white mb-1">Password</label><div class="flex gap-2"><input${ssrRenderDynamicModel(showPassword.value ? "text" : "password", password.value, null)}${ssrRenderAttr("type", showPassword.value ? "text" : "password")} required autocomplete="current-password" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500 bg-white"><button type="button" class="px-3 rounded border border-gray-300 text-sm text-white">${ssrInterpolate(showPassword.value ? "Hide" : "Show")}</button></div></div>`);
      if (error.value) {
        _push(`<p class="text-red-300 text-sm">${ssrInterpolate(error.value)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value || isLockedOut.value || !canSubmit.value) ? " disabled" : ""} class="w-full bg-pink-600 text-white py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed">${ssrInterpolate(isSubmitting.value ? "Signing in..." : "Sign in")}</button>`);
      if (isLockedOut.value) {
        _push(`<p class="text-amber-300 text-sm"> Too many failed attempts. Try again in ${ssrInterpolate(lockoutSecondsRemaining.value)}s. </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=login-6OBf9nIa.mjs.map

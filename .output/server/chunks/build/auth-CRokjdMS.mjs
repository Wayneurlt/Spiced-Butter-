import { h as defineNuxtRouteMiddleware, e as navigateTo } from './server.mjs';
import { u as useAdminAuth } from './useAdminAuth-BUCdWZ1O.mjs';
import 'vue';
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
import 'vue/server-renderer';

const auth = defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated()) {
    return navigateTo({
      path: "/auth/login",
      query: { redirect: to.fullPath }
    });
  }
});

export { auth as default };
//# sourceMappingURL=auth-CRokjdMS.mjs.map

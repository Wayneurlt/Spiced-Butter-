import { h as defineNuxtRouteMiddleware, e as navigateTo } from './server.mjs';
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

const isAuth = defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession();
  if (loggedIn.value) {
    return navigateTo("/app");
  }
});

export { isAuth as default };
//# sourceMappingURL=isAuth-oKOU8U7v.mjs.map

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated()) {
    return navigateTo({
      path: "/auth/login",
      query: { redirect: to.fullPath },
    });
  }
});

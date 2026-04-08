export default defineNuxtRouteMiddleware(() => {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated()) {
    return navigateTo("/auth/login");
  }
});

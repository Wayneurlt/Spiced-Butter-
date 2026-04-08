// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",

    
  ],
  devtools: { enabled: true },
  css: [
    "~/assets/style.css",
 
   
  ],

  app: {
    head: {
      title: "Spiced Butter",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width,initial-scale=1" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/logo.jpeg",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Bitter:wght@400;600;700;800&family=Montserrat:wght@300;400;500;600;700&family=Playball&display=swap",
        },
      ],
    },
  },

});

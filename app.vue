<template>
  <section class="sb-shell">
    <NuxtPage />
    <footer class="sb-footer">
      <div class="sb-footer__inner">
        <div class="sb-footer__brand">
          <img src="/logo.jpeg" alt="Spiced Butter logo" class="sb-footer__logo" />
          <div>
            <p class="sb-footer__title">Spiced Butter</p>
            <p class="sb-footer__tagline">Bold condiments. Small-batch craftsmanship.</p>
          </div>
        </div>

        <div class="sb-footer__social">
          <p class="sb-footer__text">Follow us</p>
          <a
            class="sb-footer__icon-link"
            href="https://www.instagram.com/_spicedbutter_?utm_source=qr&igsh=ZWtzaTl2dnpyMGg4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spiced Butter on Instagram"
          >
            <svg
              class="sb-footer__icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                stroke="currentColor"
                stroke-width="1.8"
              />
              <circle cx="12" cy="12" r="4.1" stroke="currentColor" stroke-width="1.8" />
              <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  </section>
</template>

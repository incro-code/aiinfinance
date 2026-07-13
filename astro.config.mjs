import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  base: "/aiinfinance",
  // Webflow's edge strips trailing slashes (301 /aiinfinance/ -> /aiinfinance).
  // Without this, Astro/Cloudflare adds one back (307 /aiinfinance -> /aiinfinance/),
  // producing an ERR_TOO_MANY_REDIRECTS loop. "never" aligns both layers on the
  // no-trailing-slash form.
  trailingSlash: "never",
});

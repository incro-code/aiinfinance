import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

// Mirrors Webflow's official hello-world-astro starter (minus React):
// server output + Cloudflare adapter. The static-assets pipeline force-adds
// a trailing slash on the mount root (307) that Webflow's edge strips (301),
// looping; a server-rendered route answers /aiinfinance directly.
export default defineConfig({
  base: "/aiinfinance",
  output: "server",
  compressHTML: false,
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});

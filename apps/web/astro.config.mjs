import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://halonso.digital",
  output: "static",
  trailingSlash: "ignore",
  build: { format: "directory" },
  compressHTML: true,
});

ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "show_on_homepage" BOOLEAN NOT NULL DEFAULT true;

CREATE INDEX IF NOT EXISTS "projects_status_show_on_homepage_featured_sort_order_idx"
  ON "projects"("status", "show_on_homepage", "featured", "sort_order");

CREATE TYPE "SectionType" AS ENUM ('text', 'image', 'gallery', 'metrics', 'quote', 'architecture', 'workflow', 'video');

CREATE TABLE "project_sections" (
  "id" TEXT NOT NULL,
  "project_id" TEXT NOT NULL,
  "type" "SectionType" NOT NULL DEFAULT 'text',
  "title" TEXT,
  "content" JSONB NOT NULL,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "project_sections_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "settings" (
  "key" TEXT NOT NULL,
  "value" JSONB NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "settings_pkey" PRIMARY KEY ("key")
);

CREATE INDEX "project_sections_project_id_sort_order_idx" ON "project_sections"("project_id", "sort_order");
ALTER TABLE "project_sections" ADD CONSTRAINT "project_sections_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Until the baseline release, GET /api/projects filtered on show_on_homepage, so a published
-- project that was not on the homepage was unreachable everywhere on the public site. That made
-- show_on_homepage act as a de facto publish switch and left 17 records marked published while
-- being invisible.
--
-- Fixing the endpoint made all of them public at once. This restores the previous public surface
-- by recording the intent that was actually in effect: those projects were not meant to be public,
-- so they become drafts. From here on, status controls publication and show_on_homepage only
-- controls the homepage carousel.
UPDATE "projects"
SET "status" = 'draft', "updated_at" = CURRENT_TIMESTAMP
WHERE "status" = 'published' AND "show_on_homepage" = false;

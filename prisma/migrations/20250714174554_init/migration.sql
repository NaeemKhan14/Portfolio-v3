-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "short_desc" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "images" JSONB,
    "github_link" TEXT
);
INSERT INTO "new_Project" ("content", "github_link", "id", "images", "short_desc", "slug", "title") SELECT "content", "github_link", "id", "images", "short_desc", "slug", "title" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE INDEX "Project_slug_idx" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

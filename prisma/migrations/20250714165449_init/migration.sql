-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "short_desc" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "github_link" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

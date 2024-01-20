-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "dueDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'maybe',
    "returnDate" DATETIME,
    "returnTo" TEXT
);
INSERT INTO "new_Item" ("completed", "createdAt", "description", "dueDate", "id", "link", "title", "type", "updatedAt", "userId") SELECT "completed", "createdAt", "description", "dueDate", "id", "link", "title", "type", "updatedAt", "userId" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

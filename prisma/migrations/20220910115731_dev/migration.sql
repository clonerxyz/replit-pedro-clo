-- CreateTable
CREATE TABLE "ChatLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "name" TEXT,
    "msg" TEXT NOT NULL,
    "group" TEXT NOT NULL
);

/*
  Warnings:

  - You are about to drop the column `userId` on the `bookmarks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookId]` on the table `bookmarks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookId` to the `bookmarks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."bookmarks" DROP CONSTRAINT "bookmarks_userId_fkey";

-- AlterTable
ALTER TABLE "public"."bookmarks" DROP COLUMN "userId",
ADD COLUMN     "bookId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."books" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bookmarks_bookId_key" ON "public"."bookmarks"("bookId");

-- AddForeignKey
ALTER TABLE "public"."books" ADD CONSTRAINT "books_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."bookmarks" ADD CONSTRAINT "bookmarks_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

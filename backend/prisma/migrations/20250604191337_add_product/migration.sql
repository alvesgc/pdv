/*
  Warnings:

  - Added the required column `bar_code` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "bar_code" TEXT NOT NULL,
ADD COLUMN     "code" INTEGER NOT NULL,
ALTER COLUMN "active" DROP DEFAULT;

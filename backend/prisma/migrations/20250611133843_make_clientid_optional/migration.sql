-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_clientId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "clientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

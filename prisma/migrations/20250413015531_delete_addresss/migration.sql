/*
  Warnings:

  - You are about to drop the column `addresss` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_authorAddress_fkey";

-- DropIndex
DROP INDEX "User_addresss_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "addresss",
ADD COLUMN     "address" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_authorAddress_fkey" FOREIGN KEY ("authorAddress") REFERENCES "User"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

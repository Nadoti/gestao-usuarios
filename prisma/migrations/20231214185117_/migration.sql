/*
  Warnings:

  - You are about to drop the column `imagePNG` on the `users` table. All the data in the column will be lost.
  - Added the required column `avatar` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `imagePNG`,
    ADD COLUMN `avatar` VARCHAR(191) NOT NULL;

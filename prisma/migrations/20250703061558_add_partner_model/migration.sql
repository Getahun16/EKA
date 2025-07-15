/*
  Warnings:

  - You are about to drop the column `image` on the `partner` table. All the data in the column will be lost.
  - Added the required column `logo` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `partner` DROP COLUMN `image`,
    ADD COLUMN `logo` VARCHAR(191) NOT NULL;

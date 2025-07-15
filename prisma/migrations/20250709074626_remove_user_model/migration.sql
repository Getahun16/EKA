/*
  Warnings:

  - You are about to drop the `passwordresettoken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `passwordresettoken` DROP FOREIGN KEY `PasswordResetToken_userId_fkey`;

-- AlterTable
ALTER TABLE `admin` ADD COLUMN `resetToken` VARCHAR(191) NULL,
    ADD COLUMN `resetTokenExpiry` DATETIME(3) NULL;

-- DropTable
DROP TABLE `passwordresettoken`;

-- DropTable
DROP TABLE `user`;

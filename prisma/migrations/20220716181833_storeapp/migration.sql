/*
  Warnings:

  - You are about to alter the column `firstname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(128)`.
  - You are about to alter the column `lastname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(128)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(128)`.
  - You are about to alter the column `locale` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(2)`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `firstname` VARCHAR(128) NULL,
    MODIFY `lastname` VARCHAR(128) NULL,
    MODIFY `password` VARCHAR(128) NULL,
    MODIFY `bio` TEXT NULL,
    MODIFY `locale` VARCHAR(2) NULL;

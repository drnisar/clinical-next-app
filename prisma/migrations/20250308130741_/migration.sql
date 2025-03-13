/*
  Warnings:

  - You are about to drop the column `dose` on the `drugs_list` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `drugs_list` DROP COLUMN `dose`,
    ADD COLUMN `strength` VARCHAR(45) NULL;

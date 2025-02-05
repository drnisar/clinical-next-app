/*
  Warnings:

  - Added the required column `status` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointment` ADD COLUMN `notes` VARCHAR(255) NULL,
    ADD COLUMN `status` VARCHAR(45) NOT NULL,
    ADD COLUMN `type` VARCHAR(45) NOT NULL;

/*
  Warnings:

  - Made the column `status` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Appointment` MODIFY `status` VARCHAR(45) NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `Clinic Visit` ADD COLUMN `visit_date` DATE NULL;

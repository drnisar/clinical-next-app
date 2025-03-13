/*
  Warnings:

  - You are about to drop the `Clinic Visit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Clinic Visit` DROP FOREIGN KEY `fk_Clinic Visit_Registration`;

-- DropTable
DROP TABLE `Clinic Visit`;

-- CreateTable
CREATE TABLE `Clinic_Visit` (
    `visit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `clinical_details` LONGTEXT NULL,
    `registration_id` INTEGER NOT NULL,
    `visit_date` DATE NULL,
    `instructions` LONGTEXT NULL,

    INDEX `fk_Clinic Visit_Registration_idx`(`registration_id`),
    PRIMARY KEY (`visit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `drugs_list` (
    `drug_id` INTEGER NOT NULL AUTO_INCREMENT,
    `generic_name` VARCHAR(45) NULL,
    `trade_name` VARCHAR(45) NULL,
    `drug_form` VARCHAR(45) NULL,
    `dose` INTEGER NULL,
    `unit` VARCHAR(45) NULL,
    `dilution` VARCHAR(255) NULL,
    `full_name` VARCHAR(255) NULL,

    PRIMARY KEY (`drug_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConsultationMedications` (
    `consult_med_id` INTEGER NOT NULL AUTO_INCREMENT,
    `visit_id` INTEGER NOT NULL,
    `drug_name` VARCHAR(45) NOT NULL,
    `quantity` INTEGER NULL,
    `drug_form` VARCHAR(45) NULL,
    `frequency` VARCHAR(45) NULL,
    `route` VARCHAR(45) NULL,
    `duration` INTEGER NULL,
    `interval` VARCHAR(45) NULL,
    `instructions` VARCHAR(255) NULL,

    INDEX `fk_Consultation Medications_Clinic Visit1_idx`(`visit_id`),
    PRIMARY KEY (`consult_med_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Clinic_Visit` ADD CONSTRAINT `fk_Clinic Visit_Registration` FOREIGN KEY (`registration_id`) REFERENCES `Registration`(`registration_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ConsultationMedications` ADD CONSTRAINT `fk_Consultation Medications_Clinic Visit1` FOREIGN KEY (`visit_id`) REFERENCES `Clinic_Visit`(`visit_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

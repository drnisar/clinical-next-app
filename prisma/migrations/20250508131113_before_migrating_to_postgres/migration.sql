-- AlterTable
ALTER TABLE `Admission Discharge` ADD COLUMN `diagnosis` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `Clinic_Visit` ADD COLUMN `status` VARCHAR(45) NULL;

-- AlterTable
ALTER TABLE `Registration` ADD COLUMN `code` VARCHAR(45) NULL,
    ADD COLUMN `dob` DATE NULL;

-- CreateTable
CREATE TABLE `ot` (
    `ot_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admission_id` INTEGER NOT NULL,
    `surgery_date` DATE NULL,
    `surgeon` VARCHAR(45) NULL,
    `assistant_1` VARCHAR(45) NULL,
    `assistant_2` VARCHAR(45) NULL,
    `assistant_3` VARCHAR(45) NULL,
    `anaesthetist` VARCHAR(45) NULL,
    `anaesthesia` VARCHAR(45) NULL,
    `procedure_name` VARCHAR(255) NULL,
    `findings` LONGTEXT NULL,
    `operative_details` LONGTEXT NULL,
    `closure` LONGTEXT NULL,
    `postop_instructions` LONGTEXT NULL,
    `finalize` TINYINT NULL DEFAULT 0,

    INDEX `fk_admission_id`(`admission_id`),
    PRIMARY KEY (`ot_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ot` ADD CONSTRAINT `fk_admission_id` FOREIGN KEY (`admission_id`) REFERENCES `Admission Discharge`(`admission_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

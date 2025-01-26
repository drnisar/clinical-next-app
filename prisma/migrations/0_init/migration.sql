-- CreateTable
CREATE TABLE `Admission Discharge` (
    `admission_id` INTEGER NOT NULL AUTO_INCREMENT,
    `admission_date` DATETIME(0) NULL,
    `admission_mode` VARCHAR(45) NULL,
    `status` VARCHAR(45) NOT NULL,
    `discharge_date` DATETIME(0) NULL,
    `discharge_mode` VARCHAR(45) NULL,
    `registration_id` INTEGER NOT NULL,

    INDEX `fk_Admission Discharge_Registration1_idx`(`registration_id`),
    PRIMARY KEY (`admission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `appointment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `date_appointment` DATETIME(0) NOT NULL,
    `plan` VARCHAR(255) NOT NULL,
    `registration_id` INTEGER NOT NULL,

    INDEX `fk_Appointment_Registration1_idx`(`registration_id`),
    PRIMARY KEY (`appointment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clinic Visit` (
    `visit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `clinical_details` LONGTEXT NULL,
    `registration_id` INTEGER NOT NULL,

    INDEX `fk_Clinic Visit_Registration_idx`(`registration_id`),
    PRIMARY KEY (`visit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Discharge Medications` (
    `dc_meds_id` INTEGER NOT NULL AUTO_INCREMENT,
    `med_name` VARCHAR(45) NOT NULL,
    `route` VARCHAR(45) NOT NULL,
    `frequency` VARCHAR(45) NOT NULL,
    `duration` TINYINT NULL,
    `interval` VARCHAR(45) NULL,
    `admission_id` INTEGER NOT NULL,

    INDEX `fk_Discharge Medications_Admission Discharge1_idx`(`admission_id`),
    PRIMARY KEY (`dc_meds_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registration` (
    `registration_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(45) NOT NULL,
    `last_name` VARCHAR(45) NOT NULL,
    `gender` VARCHAR(45) NOT NULL,
    `phone_number` VARCHAR(45) NULL,
    `mr_number` VARCHAR(45) NULL,

    PRIMARY KEY (`registration_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Admission Discharge` ADD CONSTRAINT `fk_Admission Discharge_Registration1` FOREIGN KEY (`registration_id`) REFERENCES `Registration`(`registration_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `fk_Appointment_Registration1` FOREIGN KEY (`registration_id`) REFERENCES `Registration`(`registration_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Clinic Visit` ADD CONSTRAINT `fk_Clinic Visit_Registration` FOREIGN KEY (`registration_id`) REFERENCES `Registration`(`registration_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Discharge Medications` ADD CONSTRAINT `fk_Discharge Medications_Admission Discharge1` FOREIGN KEY (`admission_id`) REFERENCES `Admission Discharge`(`admission_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;


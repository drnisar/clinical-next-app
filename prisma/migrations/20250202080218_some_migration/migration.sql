-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `fk_Appointment_Registration1`;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `fk_Appointment_Registration1` FOREIGN KEY (`registration_id`) REFERENCES `Registration`(`registration_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

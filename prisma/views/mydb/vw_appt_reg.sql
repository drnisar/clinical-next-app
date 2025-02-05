SELECT
  `r`.`first_name` AS `first_name`,
  `r`.`last_name` AS `last_name`,
  `r`.`gender` AS `gender`,
  `a`.`appointment_id` AS `appointment_id`,
  `a`.`plan` AS `plan`,
  `a`.`status` AS `status`,
  `a`.`registration_id` AS `registration_id`
FROM
  (
    `mydb`.`registration` `r`
    JOIN `mydb`.`appointment` `a` ON((`r`.`registration_id` = `a`.`registration_id`))
  )
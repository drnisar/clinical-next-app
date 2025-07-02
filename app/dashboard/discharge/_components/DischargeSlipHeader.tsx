import { Text, Box, Heading, Flex } from "@radix-ui/themes";
import Image from "next/image";
import KTH_logo from "@/public/KTH_logo.png";
import kth_name from "@/public/kth_name.png";
import React from "react";

const DischargeHeader = () => {
  return (
    <Flex direction="column">
      <Flex justify="between">
        <Box>
          <Text as="p">Consultant General and Laparoscopic Surgeon</Text>
          <Heading size="4" className="">
            Dr Nisar Ahmed
          </Heading>
          <Text size="1">
            <em>MBBS, FCPS, MRCS, MHR</em>
          </Text>
          <Text as="p" size="1">
            Associate Professor of Surgery
          </Text>
          <Text as="p" size="1">
            nisar.ahmed@kmc.edu.pk
          </Text>
        </Box>
        <Flex ml="5" justify="between">
          <Image
            src={KTH_logo}
            width={75}
            height={75}
            alt={"kth logo"}
            className="object-contain"
          />
          <Image src={kth_name} width={150} height={75} alt={"kth name"} />
        </Flex>
      </Flex>
      <Heading size="6" className="uppercase" align="center">
        Discharge Summary
      </Heading>
      <hr />
    </Flex>
  );
};

export default DischargeHeader;

"use client";
import { Text, Box, Heading, Flex, Switch } from "@radix-ui/themes";
import Image from "next/image";
import KTH_logo from "@/public/KTH_logo.png";
import kth_name from "@/public/kth_name.png";
import React, { useState } from "react";

const ConsultantHeader = () => {
  const [headerVisible, setHeaderVisible] = useState(true);

  const toggleHeaderVisibility = () => {
    setHeaderVisible(!headerVisible);
  };

  return (
    <>
      {/* <button onClick={toggleHeaderVisibility}>Toggle Header</button> */}
      <Switch
        checked={headerVisible}
        onCheckedChange={toggleHeaderVisibility}
        defaultChecked={true}
        className="print:!hidden"
      />
      {headerVisible ? (
        <Flex justify="between">
          <Box>
            <Text as="p">Consultant General and Laparoscopic Surgeon</Text>
            <Heading size="6" className="">
              Dr Nisar Ahmed
            </Heading>
            <Text>
              <em>MBBS, FCPS, MRCS, MHR</em>
            </Text>
            <Text as="p">Associate Professor of Surgery</Text>
            <Text as="p">nisar.ahmed@kmc.edu.pk</Text>
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
      ) : (
        <div className="min-h-36"></div>
      )}
    </>
  );
};

export default ConsultantHeader;

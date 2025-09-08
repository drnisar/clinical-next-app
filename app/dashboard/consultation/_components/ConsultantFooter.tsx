import React from "react";
import Image from "next/image";
import whatsapp from "@/public/whatsapp.svg";
import call from "@/public/call.png";

const ConsultantFooter = () => {
  return (
    <div className=" print:block border-t pt-5">
      <div className="flex">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <Image
              src={whatsapp}
              alt="Whatsapp"
              width={40}
              height={40}
              className="w-4 h-4 font-black"
            />
            <span>0330 555 111 6</span>
          </div>
          <div className="flex items-baseline gap-2">
            <Image
              src={call}
              alt="Call"
              width={40}
              height={40}
              className="w-4 h-4 font-black"
            />
            <p>0302 599 7208</p>
          </div>
        </div>
        <div className="border-l pl-5 ml-5 ">
          <p className="self-baseline">
            Room 101, Basement, Khyber Teaching Hospital Peshawar
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConsultantFooter;

"use client";

import logoBDC from "@/images/logobdc.png";
import Image from "next/image";
export default function LogoBDCBanner() {
  return (
    <div
      className="relative flex justify-center"
      data-aos="zoom-y-out"
      data-aos-delay="450"
    >
      <div className="flex flex-col justify-center">
        <Image src={logoBDC} width={400} alt={"logobdc"} />
      </div>
    </div>
  );
}

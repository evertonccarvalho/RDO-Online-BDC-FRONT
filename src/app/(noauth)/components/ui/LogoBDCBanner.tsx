"use client";

import logoBDC from "@/images/logoGreen.png";
import Image from "next/image";
export default function LogoBDCBanner() {
  return (
    <div>
      {/* Video thumbnail */}
      <div>
        <div
          className="relative mb-8 flex justify-center"
          data-aos="zoom-y-out"
          data-aos-delay="450"
        >
          <div className="flex flex-col justify-center">
            <Image src={logoBDC} width={300} alt={"logobdc"} />
          </div>
        </div>
      </div>
      {/* End: Video thumbnail */}
    </div>
  );
}

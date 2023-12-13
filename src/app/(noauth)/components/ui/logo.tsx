import logoBDC from "@/images/logoGreen.png";
import Image from "next/image";
import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Cruip">
      <Image src={logoBDC} priority width={50} alt="logo" />
    </Link>
  );
}

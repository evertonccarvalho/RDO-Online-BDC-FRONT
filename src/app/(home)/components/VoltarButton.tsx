// VoltarButton.js

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface VoltarButtonProps {
  href: string;
}

export default function VoltarButton(props: VoltarButtonProps) {
  const { href } = props;
  return (
    <div className="flex w-20 flex-row rounded-sm hover:text-primary">
      <Link href={href} className="flex flex-row gap-1">
        <ArrowLeftIcon /> Voltar
      </Link>
    </div>
  );
}

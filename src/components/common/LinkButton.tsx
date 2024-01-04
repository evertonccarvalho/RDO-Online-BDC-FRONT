import Link from "next/link";

interface Props {
  href: string;
  icon: React.ElementType;
  name: string;
  onClick?: () => void;
}

export default function LinkButton({
  href,
  name,
  icon: IconComponent,
  onClick,
}: Props): JSX.Element {
  return (
    <div className="flex h-10 w-fit px-4 text-primary hover:bg-primary hover:text-background">
      <Link href={href}>
        <div
          className="flex h-full w-full items-center justify-center"
          onClick={onClick}
        >
          {name}
          {IconComponent && <IconComponent />}
        </div>
      </Link>
    </div>
  );
}

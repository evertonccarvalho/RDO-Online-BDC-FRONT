import { Button } from "@/components/ui/button";
import UserOne from "@/images/user.png";
import { ArrowDown, EyeIcon, WorkflowIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Card from "./charts/CardOne";

interface WorkCardProps {
  workDescription: string;
  company: string;
  nameResponsible: string;
  phoneContact: string;
  address: string;
  logoUrl: string;
  active: Boolean;
  createdAt?: Date;
  id: number;
  count: string;
}

export default function WorkCard({
  workDescription,
  company,
  nameResponsible,
  address,
  phoneContact,
  logoUrl,
  active,
  createdAt,
  id,
  count,
}: WorkCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex w-full">
        <div className="w-full rounded-lg bg-card shadow-sm">
          <div className="relative">
            <div className="relative rounded-t-lg bg-cover p-10">
              <div className="flex justify-between">
                <div className="flex flex-col items-start gap-2 font-bold text-foreground">
                  <p className="w-full rounded-full ">{workDescription}</p>{" "}
                  <p className="w-36 rounded-full bg-primary text-center">
                    Status
                  </p>
                </div>
                <Button
                  className={`card-header ${isOpen ? "active" : ""}`}
                  onClick={toggleCard}
                >
                  <ArrowDown />
                </Button>
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="relative px-6">
              <div className=" flex flex-col justify-start gap-4 p-4">
                <div className="text-2xl font-black leading-none text-primary">
                  {company}
                </div>
                <div className="flex justify-between ">
                  <div className="flex items-center gap-4 ">
                    <div className="h-12 w-12 rounded-full border-2 border-primary">
                      <Image
                        src={logoUrl || UserOne}
                        alt="User"
                        width={300}
                        height={300}
                        quality={80}
                      />
                    </div>
                    <div className="text-sm text-foreground">
                      <p>
                        Resp: <span>{nameResponsible}</span>
                      </p>
                      <p>
                        Contato: <span>{phoneContact}</span>
                      </p>
                      <p>
                        Endereço: <span>{address}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <Button className="h-12 w-full ">
                      {id && (
                        <Link
                          className="h-12 w-full  py-4"
                          href={`/obras/${id}`}
                        >
                          Detalhes
                        </Link>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="2xl:gap-7.5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
                  <Card
                    icon={WorkflowIcon}
                    amount={`Serviços ${count}`}
                    description="Total de Serviços"
                    percentage="0.43%"
                    link={`/obras/service/${id}`}
                    iconlink={EyeIcon}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

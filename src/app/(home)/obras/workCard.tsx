import { Button } from "@/components/ui/button";
import Link from "next/link";

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
}: WorkCardProps): JSX.Element {
  return (
    <>
      <div className="flex w-64">
        <div className="w-full rounded-lg bg-card shadow-sm">
          <div className="relative">
            <div
              className=" relativerounded-t-lg bg-cover p-10"
              style={{
                backgroundImage: `url("${
                  logoUrl ||
                  "https://images.unsplash.com/photo-1556139954-ec19cce61d61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80"
                } )`,
              }}
            ></div>
            <div className="absolute right-0 top-0 p-2 ">
              <Button className="rounded-full">Status</Button>
            </div>
          </div>

          <div className="relative px-6 py-4">
            <div className="flex flex-row justify-end">
              <div
                className="absolute left-0 top-0 ml-8 h-16 w-16 -translate-y-1/2 transform rounded-full border-2 border-gray-500 bg-cover"
                style={{
                  backgroundImage: `url(${
                    logoUrl ||
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                  } )`,
                }}
              ></div>
              <div className="text-end text-sm">
                <p className="font-semibold text-gray-500">
                  Equipes: <span>10</span>
                </p>
                <p className="font-semibold text-gray-500">
                  Serviços: <span>173</span>
                </p>
              </div>
            </div>

            <div className="mt-2 text-sm">
              <p className="font-semibold text-gray-500">
                Resp: <span>{nameResponsible}</span>
              </p>{" "}
              <p className="font-semibold text-gray-500">
                Contato: <span>{phoneContact}</span>
              </p>
            </div>
            <div className="mt-2">
              <div className="font-bold  text-foreground">
                {workDescription}
              </div>
              <div className="text-md mt-2 font-black uppercase leading-none text-primary">
                {company}
              </div>
            </div>
          </div>
          <div>
            <Button className="h-12 w-full ">
              {id && (
                <Link className="h-12 w-full  py-4" href={`/obras/${id}`}>
                  Detalhes
                </Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

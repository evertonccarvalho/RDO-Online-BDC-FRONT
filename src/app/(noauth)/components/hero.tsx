import { Button } from "@/components/ui/button";
import LogoBDCBanner from "./ui/LogoBDCBanner";

export default function Hero() {
  return (
    <section className="relative">
      {/* Illustration behind hero content */}
      {/* <div
        className="-z-1 pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 transform"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#e0ff77" offset="0%" />
              <stop stopColor="#d8ff52" offset="77.402%" />
              <stop stopColor="#bad044" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div> */}

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className=" text-center">
            <h1
              className="text-4xl font-extrabold tracking-tighter md:text-6xl md:leading-tight"
              data-aos="zoom-y-out"
            >
              Você sabe{" "}
              <span className="bg-gradient-to-r from-[#dfff75] to-[#bcd43b] bg-clip-text text-transparent">
                quanto
              </span>{" "}
              e por que seus custos estão{" "}
              <span className="bg-gradient-to-r from-[#dfff75] to-[#bcd43b] bg-clip-text text-transparent">
                acima do orçado
              </span>
              ?
            </h1>
            <div className="mx-auto max-w-5xl p-4">
              <p
                className="md:text-3x1 mb-8 text-2xl text-foreground"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Através dos indicadores adequados e de ferramentas dinâmicas
                pode-se obter análises assertivas e em tempo hábil.
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <Button>Saiba Mais</Button>
              <Button>Demonstração</Button>
            </div>
          </div>
          {/* Hero image */}
          <LogoBDCBanner />
        </div>
      </div>
    </section>
  );
}

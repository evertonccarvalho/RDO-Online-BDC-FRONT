"use client";
import Breadcrumb from "../../components/Breadcrumb";
import CardFour from "./charts/CardFour";
import CardOne from "./charts/CardOne";
import CardThree from "./charts/CardThree";
import CardTwo from "./charts/CardTwo";
import ChartFour from "./charts/ChartFour";
import ChartOne from "./charts/ChartOne";
import ChartThree from "./charts/ChartThree";
import ChartTwo from "./charts/ChartTwo";

export default function Relatorios() {
  return (
    <>
      <div className=" space-y-6 p-5">
        <div>
          <Breadcrumb pageName="Relatorios" />
          <p className="text-sm text-muted-foreground">Rota de Relatorio</p>
          <div className="2xl:gap-7.5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
            <CardOne />
            <CardTwo />
            <CardThree />
            <CardFour />
          </div>

          <div className="2xl:mt-7.5 2xl:gap-7.5 mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6">
            <ChartOne />
            <ChartThree />
            <ChartTwo />
            <ChartFour />
            <div className="col-span-12 xl:col-span-8"></div>
          </div>
        </div>
      </div>
    </>
  );
}

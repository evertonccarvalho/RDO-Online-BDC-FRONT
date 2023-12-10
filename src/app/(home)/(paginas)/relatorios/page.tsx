"use client";
import Breadcrumb from "../../components/Breadcrumb";

export default function Relatorios() {
  return (
    <>
      <div className=" space-y-6 p-5">
        <div>
          <Breadcrumb pageName="Relatorios" />
          <p className="text-sm text-muted-foreground">Rota de Relatorio</p>
          <div className="2xl:gap-7.5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4"></div>

          <div className="2xl:mt-7.5 2xl:gap-7.5 mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6">
            <div className="col-span-12 xl:col-span-8"></div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Breadcrumb from "../../../components/common/Breadcrumb";

export default function Home() {
  return (
    <div className=" space-y-6 p-5">
      <div>
        <Breadcrumb pageName="Pagina Inicial" />
        <p className="text-sm text-muted-foreground">Pagina inicial</p>
      </div>
    </div>
  );
}

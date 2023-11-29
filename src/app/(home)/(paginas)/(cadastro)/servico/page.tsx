import Breadcrumb from "@/app/(home)/components/Breadcrumb";

export default function Servico() {
  return (
    <>
      <div className=" space-y-6 p-5">
        <div>
          <Breadcrumb pageName="Serviço" />
          <p className="text-sm text-muted-foreground">Rota de Serviços</p>
        </div>
      </div>
    </>
  );
}

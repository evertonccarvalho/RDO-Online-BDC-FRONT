import Breadcrumb from "@/app/(home)/components/Breadcrumb";

export default function Efetivo() {
  return (
    <>
      <div className=" space-y-6 p-5">
        <div>
          <Breadcrumb pageName="Efetivo" />
          <p className="text-sm text-muted-foreground">Rota de Efetivo</p>
        </div>
      </div>
    </>
  );
}

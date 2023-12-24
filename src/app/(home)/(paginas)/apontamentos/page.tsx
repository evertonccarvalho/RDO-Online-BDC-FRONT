import Breadcrumb from "../../../../components/common/Breadcrumb";

export default function Apontamentos() {
  return (
    <>
      <div className=" space-y-6 p-5">
        <div>
          <Breadcrumb pageName="Apontamentos" />
          <p className="text-sm text-muted-foreground">Rota de Apontamento</p>
        </div>
      </div>
    </>
  );
}

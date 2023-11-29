import Breadcrumb from "@/app/(home)/components/Breadcrumb";

export default function Equipe() {
  return (
    <>
      <div className="space-y-6 p-5">
        <div>
          <Breadcrumb pageName="Equipe" />
          <p className="text-sm text-muted-foreground">Rota de Equipe</p>
        </div>
      </div>
    </>
  );
}

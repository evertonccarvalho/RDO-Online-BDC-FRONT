import Breadcrumb from "@/app/(home)/components/Breadcrumb";

export default function Local() {
  return (
    <>
      <div className=" space-y-6 p-5">
        <div>
          <Breadcrumb pageName="Local" />
          <p className="text-sm text-muted-foreground">Rota de Local</p>
        </div>
      </div>
    </>
  );
}

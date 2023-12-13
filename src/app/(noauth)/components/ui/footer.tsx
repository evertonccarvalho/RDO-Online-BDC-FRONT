import Logo from "./logo";

export default function Footer() {
  return (
    <footer>
      <div className="bg mx-auto  max-w-6xl px-4 sm:px-6">
        {/* Top area: Blocks */}

        {/* Bottom area */}
        <div className="border-t py-4 md:flex md:items-center md:justify-between md:py-8">
          {/* Copyrights note */}
          <div className="mr-4 text-sm text-gray-600">
            ©poweredby Éverton Carvalho, 2023
          </div>
          <div className="mb-2">
            <Logo />
          </div>
        </div>
      </div>
    </footer>
  );
}

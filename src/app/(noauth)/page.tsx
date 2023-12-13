import Hero from "./components/hero";
import Header from "./components/ui/header";

export const metadata = {
  title: "Home - Simple",
  description: "Page description",
};

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
}

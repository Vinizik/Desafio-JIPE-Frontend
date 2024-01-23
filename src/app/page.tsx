import { Header } from "@/app/components/Header";
import { Main } from "@/app/components/Main";
import { Footer } from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

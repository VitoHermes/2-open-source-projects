import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Expertise from "@/components/Expertise";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <Header />
      <main className="[scroll-behavior:smooth]">
        <Banner />
        <Expertise />
        <Work />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}

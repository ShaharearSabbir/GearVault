import Footer from "@/components/commonLayout/Footer/Footer";
import Navbar from "@/components/commonLayout/Navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}

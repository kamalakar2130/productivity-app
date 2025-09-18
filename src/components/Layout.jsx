import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[4em] md:pt-0 lg:pt-18  pl-0 md:pl-56 lg:pl-0 ">
        {children}
      </main>
      <Footer />
    </div>
  );
}

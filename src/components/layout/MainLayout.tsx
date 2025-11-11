import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FAB from "../FAB";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FAB />
    </div>
  );
};

export default MainLayout;

import Navbar from "./Navbar";

export const Layout = ({ children }: { children: any }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

import React from "react";
import Head from "next/head";
import Header from "./Header";
import SideBar from "./SideBar";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  isLoading?: boolean;
  messageError?: string;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  isLoading,
  messageError,
}) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    <SideBar />
    <main>
      {isLoading ? (
        <div>
          {children}
          <ErrorMessage messageError={messageError} />
        </div>
      ) : (
        <div className="text-center mt-4">
          <LoadingSpinner />
        </div>
      )}
    </main>
    <Footer />
  </div>
);

export default Layout;

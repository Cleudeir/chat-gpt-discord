import React from "react";
import Head from "next/head";
import Header from "./Header";
import SideBar from "./SideBar";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import Footer from "./Footer";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  isLoading?: boolean;
  messageError?: string;
};

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  isLoading = true,
  messageError,
}) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <Header />
    <div className="flex flex-row w-full min-h-screen">
      <div className="fixed w-32 rounded-md ">
        <SideBar />
      </div>

      <main className="ml-32 w-full rounded-md bg-gray-100 p-4">
        {isLoading ? (
          <div>
            {children}
            {messageError && <ErrorMessage messageError={messageError} />}
          </div>
        ) : (
          <div className="text-center mt-4">
            <LoadingSpinner />
          </div>
        )}
      </main>
    </div>
    <Footer />
  </div>
);

export default Layout;

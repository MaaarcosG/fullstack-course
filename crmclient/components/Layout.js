import React, { Children } from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  /* hook de router */
  const router = useRouter();
  console.log('LOG ',router.pathname)

  return (
    <>
      <Head>
        <title> CRM - Administracion de Cliente </title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        ></link>
      </Head>

      {router.pathname === "/login" || router.pathname === "/newCount" ? (
        <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
            <div>
                {children}
            </div>
        </div>
      ) : (
        <div className="bg-gray-200">
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;

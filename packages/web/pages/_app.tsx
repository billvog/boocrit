import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import type { AppProps } from "next/app";
import { Providers } from "../modules/Providers";
import { Slide, toast } from "react-toastify";

function MyApp({ Component, pageProps }: AppProps) {
  toast.configure({
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: true,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    pauseOnHover: true,
    toastClassName: "toast-component",
    theme: "dark",
    transition: Slide,
  });

  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;

import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { Providers } from "../modules/Providers";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;

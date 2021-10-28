import React from "react";
import Head from "next/head";

interface HeaderControllerProps {
  title: string;
}

export const HeaderController: React.FC<HeaderControllerProps> = ({
  title,
}) => {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <title>{title}</title>
    </Head>
  );
};

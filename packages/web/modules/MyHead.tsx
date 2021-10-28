import React from "react";
import Head from "next/head";

interface MyHeadProps {
  title: string;
}

export const MyHead: React.FC<MyHeadProps> = ({ title }) => {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <title>{title}</title>
    </Head>
  );
};

import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { MyButton } from "./MyButton";

interface HeaderProps {
  showLogin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showLogin = true }) => {
  const router = useRouter();
  return (
    <div className="fixed left-0 top-0 flex justify-between items-center px-8 py-5 w-full bg-primary bg-opacity-60 backdrop-filter backdrop-blur z-10">
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <div>
            <img src="/favicon.ico" className="w-12 mr-6 select-none" />
          </div>
          <div className="font-slab font-bold text-4xl text-secondary select-none">
            Boocrit
          </div>
        </div>
      </Link>
      {showLogin && (
        <div>
          <MyButton
            color="accent"
            size="big"
            onClick={() => router.push("/login")}
          >
            <div className="font-slab">Login</div>
          </MyButton>
        </div>
      )}
    </div>
  );
};

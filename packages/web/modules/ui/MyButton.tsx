import ButtonStyles from "../../styles/button.module.css";
import React, { ButtonHTMLAttributes } from "react";

const sizeClassnames = {
  big: "py-2 px-8 text-base rounded-lg",
  medium: "py-2 px-6 text-sm rounded-md",
};

const colorClassnames = {
  primary:
    "bg-secondary text-primary hover:bg-secondary-hover disabled:text-primary-200 disabled:bg-secondary-hover",
  accent: "bg-accent-lightdark text-secondary hover:bg-accent",
  green: "bg-green text-primary hover:bg-green-hover",
};

type MyButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  size?: keyof typeof sizeClassnames;
  color?: keyof typeof colorClassnames;
};

export const MyButton: React.FC<MyButtonProps> = ({
  children,
  isLoading,
  size = "medium",
  color = "primary",
  ...props
}) => {
  return (
    <button
      className={`relative flex justify-center items-center font-bold select-none border-none rounded-3xl group ${
        sizeClassnames[size]
      } ${
        colorClassnames[color]
      } transition-all ease-in-out duration-150 cursor-pointer font-semibold ${
        isLoading ? ButtonStyles.loading : ""
      }`}
      {...props}
      disabled={isLoading}
    >
      <span
        className={`flex items-center leading-tight ${
          isLoading ? "opacity-0" : ""
        }`}
      >
        {children}
      </span>
    </button>
  );
};

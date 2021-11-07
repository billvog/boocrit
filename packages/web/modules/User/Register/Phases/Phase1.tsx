import Link from "next/link";
import React from "react";
import { InputField } from "../../../ui/InputField";
import { MyButton } from "../../../ui/MyButton";

interface Phase1Props {
  isSubmitting: boolean;
}

export const Phase1: React.FC<Phase1Props> = ({ isSubmitting }) => {
  return (
    <>
      <div className="w-full pb-4">
        <h2 className="font-slab text-3xl font-bold text-secondary">
          Register an account
        </h2>
        <div className="font-slab text-sm font-normal text-secondary">
          fill in your first name, last name and your email to continue
        </div>
      </div>
      <InputField name="uid" placeholder="UID" type="text" />
      <InputField name="firstName" placeholder="First name" type="text" />
      <InputField name="lastName" placeholder="Last name" type="text" />
      <InputField name="email" placeholder="Email" type="email" />
      <MyButton type="submit" isLoading={isSubmitting}>
        <span className="font-slab">Next</span>
      </MyButton>
      <div className="flex items-center font-slab text-secondary">
        already have an account?{" "}
        <div className="ml-1 font-bold">
          <Link href="/login">login</Link>
        </div>
      </div>
    </>
  );
};

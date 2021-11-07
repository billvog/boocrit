import Link from "next/link";
import React from "react";
import { InputField } from "../../../ui/InputField";
import { MyButton } from "../../../ui/MyButton";

interface Phase4Props {
  isSubmitting: boolean;
  onBack: () => void;
}

export const Phase4: React.FC<Phase4Props> = ({ isSubmitting, onBack }) => {
  return (
    <>
      <div className="w-full pb-4">
        <h2 className="font-slab text-3xl font-bold text-secondary">
          Is everything alright?
        </h2>
        <div className="font-slab text-sm font-normal text-secondary">
          check if everything is correct and finish the register process
        </div>
      </div>
      <InputField name="uid" placeholder="UID" type="text" />
      <InputField name="firstName" placeholder="First name" type="text" />
      <InputField name="lastName" placeholder="Last name" type="text" />
      <InputField name="email" placeholder="Email" type="email" disabled />
      <InputField name="password" placeholder="Password" type="password" />
      <div className="flex space-x-1">
        <MyButton type="button" onClick={onBack} color="brown">
          <span className="font-slab">Back</span>
        </MyButton>
        <MyButton type="submit" isLoading={isSubmitting}>
          <span className="font-slab">Finish</span>
        </MyButton>
      </div>
    </>
  );
};

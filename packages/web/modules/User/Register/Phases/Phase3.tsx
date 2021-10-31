import React from "react";
import { InputField } from "../../../ui/InputField";
import { MyButton } from "../../../ui/MyButton";

interface Phase3Props {
  isSubmitting: boolean;
  onBack: () => void;
}

export const Phase3: React.FC<Phase3Props> = ({ isSubmitting, onBack }) => {
  return (
    <>
      <div className="w-full pb-4">
        <h2 className="font-slab text-3xl font-bold text-secondary">
          Set your password
        </h2>
        <div className="font-slab text-sm font-normal text-secondary">
          choose a password to secure your account
        </div>
      </div>
      <InputField name="password" placeholder="Password" type="password" />
      <div className="flex space-x-1">
        <MyButton type="button" onClick={onBack} color="brown">
          <span className="font-slab">Back</span>
        </MyButton>
        <MyButton type="submit" isLoading={isSubmitting}>
          <span className="font-slab">Next</span>
        </MyButton>
      </div>
    </>
  );
};

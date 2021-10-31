import React from "react";
import { InputField } from "../../../ui/InputField";
import { MyButton } from "../../../ui/MyButton";

interface Phase2Props {
  isSubmitting: boolean;
  onBack: () => void;
}

export const Phase2: React.FC<Phase2Props> = ({ isSubmitting, onBack }) => {
  return (
    <>
      <div className="w-full pb-4">
        <h2 className="font-slab text-3xl font-bold text-secondary">
          Verify your email
        </h2>
        <div className="font-slab text-sm font-normal text-secondary">
          a verification code has been to the email you provided, please fill
          that code here
        </div>
      </div>
      <InputField name="code" placeholder="Verification code" type="text" />
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

import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

const InputUtils = `font-slab font-medium relative w-full outline-none border-none transition-colors ease-in-out duration-200 text-base text-accent-dark placeholder-accent-dark px-5 py-2.5 bg-accent-lightdark hover:bg-accent rounded-3xl disabled:opacity-50`;

type InputFieldProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  name: string;
  type: string;
  textarea?: boolean;
  helperText?: string | JSX.Element;
};

export const InputField: React.FC<InputFieldProps> = ({
  textarea,
  helperText,
  size: _,
  ...props
}) => {
  const [field, { error, touched }] = useField(props);
  return (
    <div className="w-full">
      <input {...field} {...props} id={field.name} className={InputUtils} />
      {helperText && (
        <div className="text-primary-400 mt-1 text-xs">{helperText}</div>
      )}
      {error && touched && (
        <div
          className={`text-red-400 text-right font-slab font-medium mt-1 text-base`}
        >
          {error}
        </div>
      )}
    </div>
  );
};

import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

const InputUtils = `font-sans relative w-full outline-none border-none transition-colors ease-in-out duration-200 text-sm px-4 py-2.5 bg-primary-100 hover:bg-primary-200 focus:bg-primary-200 rounded-xl focus:ring-2 focus:ring-blue-600 disabled:opacity-50`;

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
          className={`text-red-400 font-semibold mt-${
            textarea ? "0.5" : "1"
          } text-sm`}
        >
          {error}
        </div>
      )}
    </div>
  );
};

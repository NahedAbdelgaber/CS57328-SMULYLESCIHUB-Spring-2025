import { InputHTMLAttributes, JSX } from "react";
import InputForm from "./InputForm";

export default function DateInput({
    id, className = "", required, children, ...props
}: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
    return (
        <InputForm
            id={id ?? ""}
            type="date"
            required={required ?? false}
            {...props}
        >
            {children}
        </InputForm>
    );
}

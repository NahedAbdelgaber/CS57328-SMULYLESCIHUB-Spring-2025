import { InputHTMLAttributes, JSX } from "react";
import InputForm from "./InputForm";

export default function NumberInput({
    id, className = "", required, children, ...props
}: InputHTMLAttributes<HTMLInputElement>): JSX.Element {
    return (
        <InputForm
            id={id ?? ""}
            type="number"
            required={required ?? false}
            {...props}
        >
            {children}
        </InputForm>
    );
}

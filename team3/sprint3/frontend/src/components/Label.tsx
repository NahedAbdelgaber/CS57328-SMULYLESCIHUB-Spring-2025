import { JSX, LabelHTMLAttributes, ReactNode } from "react";
import { RequiredFieldStar } from ".";

export default function Label({
    htmlFor, className, type, required, children, ...props
}: { htmlFor: string; type: "form-label" | "form-check-label"; required: boolean; children: ReactNode; } & LabelHTMLAttributes<HTMLLabelElement>): JSX.Element {
    return (
        <label htmlFor={htmlFor} className={`${type} ${className ?? ""}`.trim()} {...props}>
            {children}
            {" "}
            {required && <RequiredFieldStar />}
        </label>
    );
}

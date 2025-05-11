import { JSX, SelectHTMLAttributes, ReactNode } from "react";
import { Label } from ".";

export default function Select({
    id, label, className = "", required, children, ...props
}: {
    id: string;
    label: string;
    required: boolean;
    children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>): JSX.Element {
    if (!id) {
        throw new Error("Select requires an id prop for accessibility reasons.");
    }

    return (
        <div className="mb-3">
            <Label htmlFor={id} type="form-label" required={required}>
                {label}
            </Label>
            <select
                id={id}
                className={`form-select ${className}`.trim()}
                required={required}
                {...props}
            >
                {children}
            </select>
        </div>
    );
}

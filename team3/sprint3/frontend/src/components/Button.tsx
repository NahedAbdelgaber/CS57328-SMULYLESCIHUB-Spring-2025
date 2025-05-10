import { ButtonHTMLAttributes, JSX } from "react";

export default function Button({ className = "", type, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
    return (
        <div className="text-center my-4">
            <button
                type={type}
                className={`btn ${className}`.trim()}
                {...props}
            >
                {children}
            </button>
        </div>
    );
}

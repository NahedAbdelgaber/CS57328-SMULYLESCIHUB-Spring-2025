import { JSX } from "react";
import { NavLink, NavLinkRenderProps, Outlet } from "react-router-dom";

export default function RAJobsLayout(): JSX.Element {
    return (
        <>
            <nav className="mb-4">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink to="/jobs" end className={function ({ isActive }: NavLinkRenderProps): string {
                            return `nav-link${isActive ? " active" : ""}`;
                        }}>
                            Submit RA Job
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/jobs/view" className={function ({ isActive }: NavLinkRenderProps): string {
                            return `nav-link${isActive ? " active" : ""}`;
                        }}>
                            View RA Jobs
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/applications/new" className={function ({ isActive }: NavLinkRenderProps): string {
                            return `nav-link${isActive ? " active" : ""}`;
                        }}>
                            Submit Application
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
}

import { JSX } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { RAJobForm, RAJobsLayout, ApplicationForm } from "./components";
import { ViewRAJobPage, ViewRAJobsPage } from "./pages";

export default function App(): JSX.Element {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/jobs" replace />} />
                <Route path="/jobs" element={<RAJobsLayout />}>
                    <Route index element={<RAJobForm />} />
                    <Route path=":id" element={<RAJobForm />} />
                    <Route path="view" element={<ViewRAJobsPage />} />
                    <Route path="view/:id" element={<ViewRAJobPage />} />
                </Route>
                <Route path="/applications/new" element={<ApplicationForm />} />
            </Routes>
        </Router>
    );
}

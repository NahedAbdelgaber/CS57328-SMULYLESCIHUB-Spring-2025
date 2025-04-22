import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RAJobForm from "./components/RAJobForm";
import ViewRAJobs from "./components/ViewRaJobs";
import ViewRAJobPage from "./components/ViewRAJobPage";

const App: React.FC = () => {
  return (
    <Router>
      <nav style={{ marginBottom: "1rem" }}>
        <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
          <li><Link to="/">Submit RA Job</Link></li>
          <li><Link to="/view">View RA Jobs</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<RAJobForm />} />
        <Route path="/view" element={<ViewRAJobs />} />
        <Route path="/view/:id" element={<ViewRAJobPage />} />
      </Routes>
    </Router>
  );
};

export default App;

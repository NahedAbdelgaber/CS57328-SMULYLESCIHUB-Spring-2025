import React from "react";
import EmployeeList from "./components/EmployeeList";
import ChallengeForm from "./components/ChallengeForm";

function App() {
  return (
    <div>
      <h1>Company Dashboard</h1>
      {/* Existing Employee Management component */}
      <EmployeeList />
      <hr />
      {/* New Industry Challenge Form */}
      <ChallengeForm />
    </div>
  );
}

export default App;

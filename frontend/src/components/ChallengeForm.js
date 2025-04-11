import React, { useState } from "react";
import { postChallenge } from "../services/api";

const ChallengeForm = () => {
  // State to hold form fields
  const [challenge, setChallenge] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    expertise: "",
  });

  // Error message state and success message state
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Validation function for required fields and proper input formats
  const validate = () => {
    const errors = {};
    if (!challenge.title) errors.title = "Title is required.";
    if (!challenge.description)
      errors.description = "Description is required.";
    if (!challenge.budget) {
      errors.budget = "Budget is required.";
    } else if (isNaN(challenge.budget) || Number(challenge.budget) <= 0) {
      errors.budget = "Budget must be a positive number.";
    }
    if (!challenge.deadline)
      errors.deadline = "Deadline is required.";
    if (!challenge.expertise)
      errors.expertise = "Expertise is required.";
    return errors;
  };

  // Update state when user modifies any form field
  const handleChange = (e) => {
    setChallenge({
      ...challenge,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit with validation and API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Clear previous errors if validation passes
    setErrors({});

    // Prepare challenge data. Note: Status set to "Open" by default.
    const challengeData = {
      ...challenge,
      status: "Open",
    };

    try {
      // Send the challenge data via the API service
      await postChallenge(challengeData);
      setSuccessMessage("Your challenge has been posted successfully!");
      // Reset form fields after successful creation
      setChallenge({
        title: "",
        description: "",
        budget: "",
        deadline: "",
        expertise: "",
      });
    } catch (error) {
      // Display error if the API call fails
      setErrors({ submit: "Error posting challenge. Please try again." });
    }
  };

  return (
    <div>
      <h2>Create Industry Challenge</h2>
      {/* Display success or error messages */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errors.submit && (
        <div className="error-message">{errors.submit}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={challenge.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={challenge.description}
            onChange={handleChange}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>
        <div>
          <label>Budget:</label>
          <input
            type="number"
            name="budget"
            value={challenge.budget}
            onChange={handleChange}
          />
          {errors.budget && <span className="error">{errors.budget}</span>}
        </div>
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={challenge.deadline}
            onChange={handleChange}
          />
          {errors.deadline && (
            <span className="error">{errors.deadline}</span>
          )}
        </div>
        <div>
          <label>Expertise Required:</label>
          <input
            type="text"
            name="expertise"
            value={challenge.expertise}
            onChange={handleChange}
          />
          {errors.expertise && (
            <span className="error">{errors.expertise}</span>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ChallengeForm;

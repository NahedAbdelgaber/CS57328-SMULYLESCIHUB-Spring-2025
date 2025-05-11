import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import RAJob from "./RAJob";

const ViewRAJobPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<RAJob | null>(null);
  const [loading, setLoading] = useState(true);
  const BASE = "http://localhost:8080";

  useEffect(() => {
    if (!id) {
      navigate("/view");
      return;
    }
    fetch(`${BASE}/api/jobs/${id}`)
      .then((res) => {
        if (res.status === 404) {
          navigate("/view");
          return null;
        }
        return res.json();
      })
      .then((data: RAJob | null) => {
        setJob(data);
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) {
    return <p>Loading…</p>;
  }

  if (!job) {
    return <p>Job not found.</p>;
  }

  const majors = job.preferredMajors ?? [];
  const skills = job.skillsRequired ?? [];

  return (
    <div style={{ padding: "1rem" }}>
      <Link to="/view">&larr; Back to all jobs</Link>
      <h2>{job.title}</h2>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Status:</strong> {job.status}</p>
      {job.time && (
        <p>
          <strong>Update Time:</strong>{" "}
          {new Date(job.time as unknown as Date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      )}
      {job.department && <p><strong>Department:</strong> {job.department}</p>}
      {job.location && <p><strong>Location:</strong> {job.location}</p>}
      {job.startDate && <p><strong>Start Date:</strong> {job.startDate}</p>}
      {job.endDate && <p><strong>End Date:</strong> {job.endDate}</p>}
      {job.timeCommitment && <p><strong>Time Commitment:</strong> {job.timeCommitment}</p>}
      <p><strong>Paid:</strong> {job.paid ? "Yes" : "No"}</p>
      {job.paid && job.stipendAmount !== undefined && (
        <p><strong>Stipend:</strong> ${job.stipendAmount}</p>
      )}
      {majors.length > 0 && (
        <p><strong>Preferred Majors:</strong> {majors.join(", ")}</p>
      )}
      {skills.length > 0 && (
        <p><strong>Skills Required:</strong> {skills.join(", ")}</p>
      )}
    </div>
  );
};

export default ViewRAJobPage;

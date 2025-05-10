import { JSX } from "react";
import { useParams, Link, useNavigate, NavigateFunction } from "react-router-dom";
import { useRAJob } from "../hooks";

export default function ViewRAJobPage(): JSX.Element {
    const { id } = useParams<{ id: string; }>();
    const navigate: NavigateFunction = useNavigate();

    const { job, loading, error } = useRAJob(id ?? "");

    if (!id) {
        navigate("/view");
        return <></>;
    }

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <p>Loading RA job...</p>
            </div>
        );
    }

    if (error || !job) {
        return <p>Job not found.</p>;
    }

    return (
        <div className="container p-3">
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
            {job.preferredMajors.length > 0 && (
                <p><strong>Preferred Majors:</strong> {job.preferredMajors.join(", ")}</p>
            )}
            {job.skillsRequired.length > 0 && (
                <p><strong>Skills Required:</strong> {job.skillsRequired.join(", ")}</p>
            )}
        </div>
    );
}

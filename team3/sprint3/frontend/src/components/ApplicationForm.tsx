import { useState, useEffect, JSX } from "react";
import { getJobs } from "../services";
import api from "../services/api";

interface Job {
    id: number;
    title: string;
    description: string;
}

export default function ApplicationForm(): JSX.Element {
    const [studentName, setStudentName] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getJobs()
            .then((res) => {
                // Only keep id, title, and description
                const cleaned = res.map((job: any) => ({
                    id: job.id,
                    title: job.title,
                    description: job.description,
                }));
                setJobs(cleaned);
            })
            .catch((err) => console.error("Error fetching jobs:", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!studentName || !studentEmail || selectedJobId === null) {
            setError("Please fill out all fields.");
            return;
        }

        const application = {
            studentName,
            studentEmail,
            jobId: selectedJobId,
        };

        try {
            await api.post("/applications", application);

            // If the request succeeded (status 2xx), you'll get here
            alert("Application submitted!");
            setStudentName("");
            setStudentEmail("");
            setSelectedJobId(null);
            setError("");
        } catch (err) {
            console.error("Error submitting application:", err);
            alert("Failed to submit application.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>RA Job Application</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Full Name</label>
                    <input
                        className="form-control"
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        className="form-control"
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Select a Job</label>
                    <ul className="list-group">
                        {jobs.map((job) => (
                            <li
                                key={job.id}
                                className={`list-group-item ${
                                    selectedJobId === job.id ? "active" : ""
                                }`}
                                onClick={() => setSelectedJobId(job.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <strong>{job.title}</strong> – {job.description}
                            </li>
                        ))}
                    </ul>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button className="btn btn-primary mt-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}
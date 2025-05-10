import { ChangeEvent, FormEvent, JSX, useEffect, useState } from "react";
import { RAJob } from "../models";
import { addJob, updateJob } from "../services";
import { Button, CheckBox, DateInput, NumberInput, Select, TextArea, TextInput, TimeInput } from "../components";
import { useRAJob } from "../hooks";
import { useParams } from "react-router-dom";

function createRAJob(): RAJob {
    return {
        title: "",
        description: "",
        status: "OPEN",
        time: "",
        updateTime: "",
        department: "",
        location: "",
        startDate: "",
        endDate: "",
        timeCommitment: "",
        paid: false,
        stipendAmount: 0,
        preferredMajors: [],
        skillsRequired: [],
    };
}

export default function RAJobForm(): JSX.Element {
    const { id } = useParams<{ id: string; }>();
    const isEditMode: boolean = Boolean(id);

    const { job, loading, error } = useRAJob(id ?? "");
    const [data, setData] = useState<RAJob>(createRAJob());

    useEffect(function (): void {
        if (isEditMode && job) {
            setData(job);
        }
    }, [isEditMode, job]);

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <p>Loading RA jobs...</p>
            </div>
        );
    }

    if (isEditMode && error) {
        return <p>Error loading job.</p>;
    }

    function handleChange(field: keyof RAJob): (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void {
        return function (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
            const rawValue: string | boolean = e.target.type === "checkbox"
                ? (e.target as HTMLInputElement).checked
                : e.target.value;

            let value: any = rawValue;

            // If the field is one of the CSV fields, split it
            if (field === "preferredMajors" || field === "skillsRequired") {
                value = (rawValue as string).split(",").map(function (s: string): string {
                    return s.trim();
                });
            }

            setData(function (prev: RAJob): RAJob {
                return ({
                    ...prev,
                    [field]: value,
                });
            });
        };
    }

    async function handleSubmit(event: FormEvent): Promise<void> {
        event.preventDefault();

        function reset(): void {
            alert("RA Job submitted successfully!");
            setData(createRAJob());
        }

        function fail(err: any): void {
            alert("Failed to submit job.");
            console.error("Failed to submit job.", err);
        }

        const jobData: RAJob = {
            ...data,
            stipendAmount: data.paid ? data.stipendAmount : 0,
            preferredMajors: data.preferredMajors.map(function (s: string): string {
                return s.trim();
            }),
            skillsRequired: data.skillsRequired.map(function (s: string): string {
                return s.trim();
            }),
            updateTime: `${data.updateTime}:00`,
        };

        if (isEditMode) {
            updateJob(Number(id), jobData);
        }
        else {
            addJob(jobData).then(reset).catch(fail);
        }
    }

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h2 className="text-center mb-4 fw-bold">
                    Post RA Job Opening
                </h2>

                <h6 className="text-danger">Required fields are marked with *</h6>

                <TextInput
                    id="title"
                    value={data.title}
                    onChange={handleChange("title")}
                    required={true}
                >
                    Title
                </TextInput>

                <TextArea
                    id="description"
                    value={data.description}
                    onChange={handleChange("description")}
                    required={true}
                >
                    Description
                </TextArea>

                <Select
                    id="status"
                    label="Status"
                    value={data.status}
                    onChange={handleChange("status")}
                    required={true}
                >
                    <option value="">Select Status</option>
                    <option value="OPEN">Open</option>
                    <option value="CLOSED">Closed</option>
                </Select>

                <TimeInput
                    id="update-time"
                    value={data.updateTime}
                    onChange={handleChange("updateTime")}
                    required={true}
                >
                    Update Time
                </TimeInput>

                <TextInput
                    id="department"
                    value={data.department}
                    onChange={handleChange("department")}
                    required={false}
                >
                    Department
                </TextInput>

                <TextInput
                    id="location"
                    value={data.location}
                    onChange={handleChange("location")}
                    required={false}
                >
                    Location
                </TextInput>

                <DateInput
                    id="start-date"
                    value={data.startDate}
                    onChange={handleChange("startDate")}
                    required={false}
                >
                    Start Date
                </DateInput>

                <DateInput
                    id="end-date"
                    value={data.endDate}
                    onChange={handleChange("endDate")}
                    required={false}
                >
                    End Date
                </DateInput>

                <TextInput
                    id="time-commitment"
                    placeholder="e.g. 10 hrs/week"
                    value={data.timeCommitment}
                    onChange={handleChange("timeCommitment")}
                    required={false}
                >
                    Time commitment
                </TextInput>

                <div className="mb-3">
                    <CheckBox
                        id="paid-position"
                        label="Paid Position?"
                        checked={data.paid}
                        onChange={handleChange("paid")}
                        required={false}
                    />
                </div>

                {data.paid && <NumberInput
                    id="stipend-amount"
                    value={data.stipendAmount}
                    onChange={handleChange("stipendAmount")}
                    min={0}
                    required={false}
                >
                    Stipend Amount ($)
                </NumberInput>}

                <TextInput
                    id="preferred-majors"
                    placeholder="e.g., CS, Math"
                    value={data.preferredMajors.join(", ")}
                    onChange={handleChange("preferredMajors")}
                    required={false}
                >
                    Preferred Majors (comma-separated)
                </TextInput>

                <TextInput
                    id="skills-required"
                    placeholder="e.g., Python, Excel"
                    value={data.skillsRequired.join(", ")}
                    onChange={handleChange("skillsRequired")}
                    required={false}
                >
                    Skills Required (comma-separated)
                </TextInput>

                <Button type="submit" className="btn-primary">Submit</Button>
            </form>
        </div>
    );
}

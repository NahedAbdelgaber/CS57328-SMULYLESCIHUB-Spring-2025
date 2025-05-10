import { api } from ".";
import { RAJob } from "../models";

export async function getJob(id: number): Promise<RAJob> {
    return (await api.get<RAJob>(`/jobs/${id}`)).data;
}

export async function getJobs(): Promise<RAJob[]> {
    return (await api.get<RAJob[]>("/jobs")).data;
}

export async function addJob(job: RAJob): Promise<RAJob> {
    const data: RAJob = (await api.post<RAJob>("/jobs", job)).data;
    console.log("Submitting job:", data);
    return data;
}

export async function updateJob(id: number, job: RAJob): Promise<RAJob> {
    return (await api.put<RAJob>(`/jobs/${id}`, job)).data;
}

export async function deleteJob(id: number): Promise<void> {
    return await api.delete(`/jobs/${id}`);
}

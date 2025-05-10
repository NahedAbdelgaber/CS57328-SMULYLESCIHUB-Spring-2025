import { useEffect, useState } from "react";
import { getJob } from "../services";
import { RAJob } from "../models";

export default function useRAJob(id: string): { job: RAJob | null; loading: boolean; error: string | null; } {
    const [job, setJob] = useState<RAJob | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(function (): void {
        setLoading(true);
        getJob(Number(id))
            .then(function (data: RAJob): void {
                setJob(data);
            })
            .catch(function (err: any): void {
                console.error("Failed to fetch job", err);
                setError("Failed to load job.");
            })
            .finally(function (): void {
                setLoading(false);
            });
    }, [id]);

    return { job, loading, error };
}

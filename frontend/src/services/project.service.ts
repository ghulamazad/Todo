"use server"
import { fetchClient } from "@/utils/api";
import { revalidatePath } from "next/cache";

export async function getProjects(): Promise<Array<Project>> {
    const res = await fetchClient<Array<Project>>('/projects/');
    return res.data;
}

export async function getProject(id: number): Promise<Project> {
    const res = await fetchClient<Project>(`/projects/${id}`);
    return res.data;
}


export async function createProject(title: string, id?: number) {
    let url = `/projects/`
    if (!title.trim()) {
        throw new Error("Title is required.");
    }
    if (id) {
        url += id;
    }
    const data = await fetchClient<Project>(url, {
        method: id ? "PUT" : "POST",
        body: JSON.stringify({ title })
    });
    revalidatePath('/', 'page');
    return data;
}

export async function deleteProjects(id: number): Promise<Array<Project>> {
    const res = await fetchClient<Array<Project>>(`/projects/${id}`, { method: 'delete' });
    revalidatePath('/', 'page');
    return res.data;
}



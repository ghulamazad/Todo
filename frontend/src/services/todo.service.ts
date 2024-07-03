"use server";
import { fetchClient } from "@/utils/api";
import { revalidatePath } from "next/cache";
const BASE_URL = "/todos";
export async function getTodos(projectId: number) {
  const res = await fetchClient<Array<Todo>>(`${BASE_URL}/${projectId}`);
  return res.data;
}

export async function getSearchTodo(projectId: number, todo: string) {
  const res = await fetchClient<Array<Todo>>(`${BASE_URL}/search`, {
    method: "POST",
    body: JSON.stringify({ projectId, todo }),
  });
  return res.data;
}

export async function getTodo(projectId: number, id: number) {
  const res = await fetchClient<Todo>(`${BASE_URL}/${projectId}`);
  return res.data;
}

export async function createTodo(
  projectId: number,
  description: string,
  id?: number
) {
  let url = `${BASE_URL}/${projectId}`;
  if (!description.trim()) {
    throw new Error("Title is required.");
  }
  if (id) {
    url += `/${id}`;
  }
  const data = await fetchClient<Todo>(url, {
    method: id ? "PUT" : "POST",
    body: JSON.stringify({ description }),
  });
  revalidatePath("/", "page");
  return data;
}

export async function deleteTodo(id: number, projectId?: number) {
  let url = "";
  if (projectId) {
    url = `${BASE_URL}/${projectId}/${id}`;
  } else {
    url = `${BASE_URL}/${id}`;
  }
  const res = await fetchClient<Array<Todo>>(url, {
    method: "DELETE",
  });
  revalidatePath("/", "page");
  return res.data;
}

export async function markAsCompleteTodo(id: number, projectId: number) {
  const res = await fetchClient<Array<Todo>>(`${BASE_URL}/${projectId}/${id}`, {
    method: "POST",
  });
  revalidatePath("/", "page");
  return res.data;
}

export async function restoredTodo(id: number) {
  const res = await fetchClient<Array<Todo>>(`${BASE_URL}/restored-todo/${id}`);
  revalidatePath("/", "page");
  return res.data;
}

export async function recycleBinTodo() {
  const res = await fetchClient<Array<Todo>>(`${BASE_URL}/recycle-bin`);
  revalidatePath("/", "page");
  return res.data;
}

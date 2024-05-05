"use server"
import { fetchClient } from "@/utils/api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getLoginUser() {
    return fetchClient<User>('/profile/me');
}


export async function login(user: User) {
    const { email, password } = user;
    const data = await fetchClient<Token>(`/auth/authenticate`, {
        method: "POST",
        body: JSON.stringify({ email, password })
    });

    cookies().set('auth-token', data.data.token);
    revalidatePath('/', 'layout');
    redirect('/');
}


export async function signup(formData: FormData): Promise<void> {
    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const password = formData.get("password");

    const data = await fetchClient<Token>(`/auth/register`, {
        method: "POST",
        body: JSON.stringify({ fullname, email, password })
    });

    cookies().set('auth-token', data.data.token);
    revalidatePath('/', 'layout');
    redirect('/');
}
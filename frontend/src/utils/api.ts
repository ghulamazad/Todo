import { cookies } from "next/headers";

type CustomResponse<T> = {
    message: string;
    success: boolean;
    data: T
}

export async function fetchClient<T>(endpoint: string, options?: RequestInit): Promise<CustomResponse<T>> {
    const url = `${process.env.BACKEND_BASE_URL}${endpoint}`;
    const token = cookies().get('auth-token')?.value ?? '';
    console.log({ url, token, options });

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        ...options
    })
    const data = await res.json();
    console.log(data);

    if (!res.ok) {
        throw new Error(data.message);
    }
    return data;
}
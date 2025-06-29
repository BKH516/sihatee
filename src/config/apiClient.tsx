import { toast } from "react-hot-toast";

const BASE_URL = "http://localhost:5173/sihatee";

interface FetchOptions extends RequestInit {
    authToken?: string;
}

export const apiClient = async (
    endpoint: string,
    options: FetchOptions = {}
) => {
    const { authToken, ...fetchOptions } = options;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(fetchOptions.headers ? fetchOptions.headers as Record<string, string> : {}),
    };

    if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...fetchOptions,
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const message =
                errorData?.error?.message || `Request failed: ${response.status}`;
            throw new Error(message);
        }

        return await response.json();
    } catch (error: any) {
        toast.error(error.message || "حدث خطأ أثناء الاتصال بالسيرفر ");
        throw error;
    }
};

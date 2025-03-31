import { auth } from "@/app/auth";

// interface FetchError extends Error {
//   status?: number;
//   data?: any;
// }

const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
  timeout = 10000
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const data = await auth();

    const token = data?.user.token;

    const headers = {
      ...options.headers,
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    return response.json();
  } catch (error) {
    console.log("Error Occured: ⚠️ ", error);
    clearTimeout(timeoutId);

    // if (error.name === "AbortError") {
    //   const timeoutError: FetchError = new Error("Request timed out");
    //   timeoutError.name = "TimeoutError";
    //   throw timeoutError;
    // }

    throw error;
  }
};

export default fetcher;

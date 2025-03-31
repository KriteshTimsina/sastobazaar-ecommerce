// import { auth } from "@/auth";

// import { auth } from "@/app/auth";

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
    // const token = await auth();

    const headers = {
      ...options.headers,
      // ...(token?.user?.token && {
      //   Authorization: token.accessToken,
      // }),
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTlhMjY4ZGFhM2IyMzlmNzAwMzYwNiIsImlhdCI6MTc0MzM5MDI5NSwiZXhwIjoxNzQzNDc2Njk1fQ.cKqyz_BO5DGk8IFVtgILNKDa8WNMY3NQq3IYVITUJUY",
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

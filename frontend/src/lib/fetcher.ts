// import { auth } from "@/auth";

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
      // ...(token?.accessToken && {
      //   Authorization: token.accessToken,
      // }),
      "Content-Type": "application/json",
    };

    console.log(options, "OPT");
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

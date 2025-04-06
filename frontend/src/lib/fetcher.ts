import { auth } from '@/app/auth';
import { getSession } from 'next-auth/react';

// interface FetchError extends Error {
//   status?: number;
//   data?: any;
// }

const fetcher = async <T>(url: string, options: RequestInit = {}, timeout = 10000): Promise<T> => {
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
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    return response.json();
  } catch (error) {
    console.log('Error Occured: ⚠️ ', error);
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

export const clientFetcher = async <T>(
  url: string,
  options: RequestInit = {},
  timeout = 10000,
): Promise<T> => {
  console.log(options.body);
  console.log('YA SAMMA');
  // return;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const session = await getSession();
    const token = session?.user?.token;

    const headers = {
      ...options.headers,
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeoutId);

    // if (!response.ok) {
    //   const error = new Error(
    //     "An error occurred while fetching the data."
    //   ) as FetchError;
    //   error.status = response.status;
    //   error.data = await response.json();
    //   throw error;
    // }

    return response.json();
  } catch (error) {
    console.log('Error Occurred: ⚠️ ', error);
    clearTimeout(timeoutId);
    // if (error instanceof Error) {
    //   if (error.name === "AbortError") {
    //     const timeoutError = new Error("Request timed out") as FetchError;
    //     timeoutError.name = "TimeoutError";
    //     throw timeoutError;
    //   }
    // }

    throw error;
  }
};

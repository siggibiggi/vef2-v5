import { NewsItem, NewsItemResult, HomepageData } from "@/types";

type ApiResult<T> =
  | { data: T; ok: true }
  | { ok: false; reason: "error" | "not-found"; error?: Error };

const API_URL = process.env.API_URL ?? "http://192.168.1.44:1337/api";

export async function fetchFromApi<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResult<T>> {
  let url;
  try {
    const cleanApiUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    url = new URL(`${cleanApiUrl}${cleanPath}`);
  } catch (e) {
    return { ok: false, reason: "error", error: e as Error };
  }

  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    const response = await fetch(url, { cache: "no-store", ...options, headers });

    if (!response.ok) {
      if (response.status === 404) {
        return { ok: false, reason: "not-found" };
      }
      return { ok: false, reason: "error", error: new Error("not 2xx") };
    }

    const data = await response.json();
    return { ok: true, data: data as T };
  } catch (e) {
    return { ok: false, reason: "error", error: e as Error };
  }
}

export async function getNews(limit = 10, offset = 0): Promise<ApiResult<NewsItemResult>> {
  return fetchFromApi(`/newss?pagination[start]=${offset}&pagination[limit]=${limit}`);
}

export async function getNewsItem(slug: string): Promise<ApiResult<NewsItem>> {
  const result = await fetchFromApi<NewsItemResult>(`/newss?filters[slug][$eq]=${slug}`);
  
  if (!result.ok || !result.data || result.data.data.length === 0) {
    return { ok: false, reason: "not-found" };
  }
  
  return { ok: true, data: result.data.data[0] };
}

export async function getHomepage(): Promise<ApiResult<{ data: HomepageData }>> {
  return fetchFromApi("/homepage");
}
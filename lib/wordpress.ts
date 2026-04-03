import { getWpApiUrl } from "@/lib/wp";

const API_URL = getWpApiUrl("/wp-json/wp/v2");

export type WPPost = {
  id: number;
  slug: string;
  date: string;
  modified?: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content?: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url?: string;
      media_details?: {
        sizes?: {
          medium_large?: {
            source_url: string;
          };
          full?: {
            source_url: string;
          };
        };
      };
    }[];
  };
};

async function fetchWp<T>(path: string, revalidate: number): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate },
    });

    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error("WordPress fetch failed:", error);
    return null;
  }
}

export async function getPosts(): Promise<WPPost[]> {
  const posts = await fetchWp<WPPost[]>(
    "/posts?_embed&orderby=date&order=desc",
    60,
  );
  return posts ?? [];
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const encodedSlug = encodeURIComponent(slug);
  const data = await fetchWp<WPPost[]>(
    `/posts?slug=${encodedSlug}&_embed`,
    300,
  );
  return data?.length ? data[0] : null;
}

export async function getAllPosts(): Promise<WPPost[]> {
  const posts = await fetchWp<WPPost[]>(
    "/posts?_embed&per_page=100&orderby=date&order=desc",
    300,
  );
  return posts ?? [];
}

import {
  getFallbackBlogPosts,
  getFallbackPost,
  mergePostsWithFallback,
} from "@/lib/blog-fallback";
import { fetchWpJson } from "@/lib/wp-server";

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
  return fetchWpJson<T>(`/wp-json/wp/v2${path}`, {
    next: { revalidate },
  });
}

export async function getPosts(): Promise<WPPost[]> {
  const posts = await fetchWp<WPPost[]>(
    "/posts?_embed&orderby=date&order=desc",
    60,
  );
  return mergePostsWithFallback(posts, getFallbackBlogPosts());
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const encodedSlug = encodeURIComponent(slug);
  const data = await fetchWp<WPPost[]>(
    `/posts?slug=${encodedSlug}&_embed`,
    300,
  );
  return data?.length ? data[0] : getFallbackPost(slug);
}

export async function getAllPosts(): Promise<WPPost[]> {
  const posts = await fetchWp<WPPost[]>(
    "/posts?_embed&per_page=100&orderby=date&order=desc",
    300,
  );
  return mergePostsWithFallback(posts, getFallbackBlogPosts());
}

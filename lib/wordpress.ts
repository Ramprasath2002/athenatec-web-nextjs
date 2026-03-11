const API_URL = "https://www.athenatec.com/wp-json/wp/v2";

export type WPPost = {
  id: number;
  slug: string;
  date: string;
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
        };
      };
    }[];
  };
};

export async function getPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch(
      `${API_URL}/posts?_embed`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("getPosts failed:", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<WPPost | null> {
  try {
    const res = await fetch(
      `${API_URL}/posts?slug=${slug}&_embed`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.length ? data[0] : null;
  } catch (error) {
    console.error("getPost failed:", error);
    return null;
  }
}

export async function getAllPosts(): Promise<WPPost[]> {
  try {
    const res = await fetch(
      `${API_URL}/posts?_embed&per_page=100`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("getAllPosts failed:", error);
    return [];
  }
}
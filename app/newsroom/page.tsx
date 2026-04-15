import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/app/components/HeroSection";
import type { Metadata } from "next";
import {
  getFallbackNewsroomPosts,
  mergePostsWithFallback,
} from "@/lib/blog-fallback";
import { fetchWpJson } from "@/lib/wp-server";
import { LOGO_PATH, absoluteUrl, buildMetadata, stripHtml, truncate } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Athenatec Newsroom | Partnerships & Updates",
  description:
    "Stay updated with Athenatec's latest news, strategic partnerships, and smart manufacturing announcements.",
  path: "/newsroom",
  image: "/assets/images/newsroom.webp",
  keywords: [
    "Athenatec newsroom",
    "Athenatec updates",
    "manufacturing news",
    "industry partnerships",
  ],
});

export const revalidate = 3600;

const NEWSROOM_POSTS_PATH =
  "/wp-json/wp/v2/posts?_embed&orderby=date&order=desc&slug=athena-launches-faborchestrator-agentic-ai-for-manufacturing,athena-and-tech-mahindra-announce-partnership,authorised-reseller-partnership-with-twinzo";

type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
};

async function getPosts(): Promise<WPPost[]> {
  const posts = await fetchWpJson<WPPost[]>(NEWSROOM_POSTS_PATH, {
    next: { revalidate: 3600 },
    timeoutMs: 5000,
  });

  return mergePostsWithFallback(posts, getFallbackNewsroomPosts());
}

export default async function NewsRoom() {
  const posts = await getPosts();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Newsroom",
    description:
      "Latest company news, partnerships and digital manufacturing updates from Athenatec.",
    url: "https://athenatec.com/newsroom",
    publisher: {
      "@type": "Organization",
      name: "Athenatec",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(LOGO_PATH),
      },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://athenatec.com/blog/${post.slug}`,
        name: stripHtml(post.title.rendered),
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />
      <HeroSection
        title="News Room"
        description="Latest announcements, partnerships and digital manufacturing updates from Athenatec"
        image="/assets/images/newsroom.webp"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12">Newsroom</h2>

          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-gray-400 text-lg">
                News articles are coming soon. Check back later.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post: WPPost) => {
                const featuredImage =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
                  >
                    {featuredImage && (
                      <div className="relative h-60">
                        <Image
                          src={featuredImage}
                          alt={stripHtml(post.title.rendered)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <h2
                        className="text-xl font-semibold mb-3"
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />

                      <p className="text-gray-600 text-sm mb-4">
                        {truncate(stripHtml(post.excerpt.rendered), 140)}
                      </p>

                      <p className="text-xs text-gray-400 mb-4">
                        {new Date(post.date).toLocaleDateString("en-US")}
                      </p>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-[#1c4584] font-medium hover:underline"
                      >
                        Read More
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

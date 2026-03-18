import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/app/components/HeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Athenatec Newsroom | Partnerships & Updates",
  description:
    "Stay updated with Athenatec's latest news, strategic partnerships, and smart manufacturing announcements. Explore press releases and industry updates.",
  alternates: {
    canonical: "https://athenatec.com/newsroom",
  },
  openGraph: {
    title: "Athenatec Newsroom | Partnerships & Updates",
    description:
      "Stay updated with Athenatec's latest news, strategic partnerships, and smart manufacturing announcements. Explore press releases and industry updates.",
    url: "https://athenatec.com/newsroom",
    type: "website",
  },
};

export const revalidate = 3600;

type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
};

 async function getPosts(): Promise<WPPost[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); 

    const res = await fetch(
      "https://www.athenatec.com/wp-json/wp/v2/posts?_embed&slug=athena-and-tech-mahindra-announce-partnership,authorised-reseller-partnership-with-twinzo",
      {
        next: { revalidate: 3600 },
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Newsroom fetch failed: ${res.status} ${res.statusText}`);
      return [];  
    }

    return res.json();
  } catch (error) {
    console.warn("Newsroom fetch error — returning empty:", error);
    return [];  
  }
}

export default async function NewsRoom() {
  const posts = await getPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                url: "https://athenatec.com/logo.webp",
              },
            },
          }),
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
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
                  >
                    {featuredImage && (
                      <div className="relative h-60">
                        <Image
                          src={featuredImage}
                          alt={post.title.rendered}
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

                      <div
                        className="text-gray-600 text-sm mb-4"
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.rendered,
                        }}
                      />

                      <p className="text-xs text-gray-400 mb-4">
                        {new Date(post.date).toLocaleDateString()}
                      </p>

                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-[#1c4584] font-medium hover:underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
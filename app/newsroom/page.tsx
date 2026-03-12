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

type WPPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  featured_media: number;
};

async function getPosts(): Promise<WPPost[]> {
  const res = await fetch(
    "https://www.athenatec.com/wp-json/wp/v2/posts?_embed&slug=athena-and-tech-mahindra-announce-partnership,authorised-reseller-partnership-with-twinzo",
    { next: { revalidate: 60 } },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post: any) => {
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
        </div>
      </section>
    </>
  );
}

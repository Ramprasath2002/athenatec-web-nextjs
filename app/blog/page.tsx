import { getPosts } from "@/lib/wordpress";
import Link from "next/link";
import Image from "next/image";
import "./blog.scss";
import HeroSection from "@/app/components/HeroSection";
import type { Metadata } from "next";

 export const metadata: Metadata = {
  title: "Athenatec Blog | MES & Industry 4.0 Insights",
  description:
    "Explore expert insights on MES implementation, Industry 4.0 trends, digital transformation challenges, and smart manufacturing best practices.",
  openGraph: {
    title: "Athenatec Blog | MES & Industry 4.0 Insights",
    description:
      "Explore expert insights on MES implementation, Industry 4.0 trends, digital transformation challenges, and smart manufacturing best practices.",
    url: "https://www.athenatec.com/blog",
    siteName: "Athenatec",
    type: "website",
    images: [
      {
        url: "/assets/images/blog.webp",
        width: 1200,
        height: 630,
        alt: "Athenatec Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Athenatec Blog | MES & Digital Transformation Insights",
    description:
      "Explore the Athenatec blog for expert insights on MES, Industry 4.0 trends, digital transformation challenges, and smart manufacturing best practices.",
    images: ["/assets/images/blog.webp"],
  },
  alternates: {
    canonical: "https://www.athenatec.com/blog",
  },
};

type WPPost = {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
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

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
const EXCLUDED_BLOG_SLUGS = new Set([
  "athena-and-tech-mahindra-announce-partnership",
  "authorised-reseller-partnership-with-twinzo",
  "athena-launches-faborchestrator-agentic-ai-for-manufacturing",
]);

export default async function BlogPage() {
const allPosts = await getPosts();

const posts = allPosts.filter(
  (post) => !EXCLUDED_BLOG_SLUGS.has(post.slug)
);
  const featuredPost = posts[0] ?? null;
  const remainingPosts = posts.slice(1);

  const getImage = (post: WPPost) =>
    post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
      ?.medium_large?.source_url ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    null;

  const getExcerpt = (post: WPPost, length = 160) =>
    post.excerpt?.rendered
      ?.replace(/<[^>]+>/g, "")
      ?.replace(/&#8230;/g, "...")
      ?.slice(0, length) + "...";

  return (
    <>
      <HeroSection
        title="Blog"
        description="Leave us a little info, and we'll be in touch."
        image="/assets/images/blog.webp"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      <section className="blogs">
        <div className="blog-wrapper">
          <div className="blog-header">
            <div className="blog-header__eyebrow">
              <span className="eyebrow-line" />
              <span className="eyebrow-text">Our Journal</span>
              <span className="eyebrow-line" />
            </div>
            <h1 className="blog-header__title">Latest Insights</h1>
            <p className="blog-header__subtitle">
              Perspectives, ideas, and stories worth reading
            </p>
          </div>

          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="featured-post">
              <div className="featured-post__image-wrap">
                {getImage(featuredPost) && (
                  <Image
                    src={getImage(featuredPost)!}
                    alt={featuredPost.title.rendered.replace(/<[^>]+>/g, "")}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="featured-post__image"
                    priority
                  />
                )}
                <div className="featured-post__overlay" />
              </div>

              <div className="featured-post__content">
                <span className="featured-badge">Featured</span>
                <time className="post-date">
                  {formatDate(featuredPost.date)}
                </time>
                <h2
                  className="featured-post__title"
                  dangerouslySetInnerHTML={{
                    __html: featuredPost.title.rendered,
                  }}
                />
                <p className="featured-post__excerpt">
                  {getExcerpt(featuredPost, 200)}
                </p>
                <span className="cta-link">
                  Read Article
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          )}

          <div className="blog-grid">
            {remainingPosts.map((post, i) => {
              const image = getImage(post);
              const excerpt = getExcerpt(post, 120);

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="blog-card"
                  style={{ "--delay": `${i * 0.07}s` } as React.CSSProperties}
                >
                  <div className="blog-card__image-wrap">
                    {image && (
                      <Image
                        src={image}
                        alt={post.title.rendered.replace(/<[^>]+>/g, "")}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="blog-card__image"
                      />
                    )}
                    <div className="blog-card__shimmer" />
                  </div>

                  <div className="blog-card__body">
                    <time className="post-date">{formatDate(post.date)}</time>
                    <h3
                      className="blog-card__title"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <p className="blog-card__excerpt">{excerpt}</p>

                    <span className="cta-link cta-link--sm">
                      Read More
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
import { getPosts } from "@/lib/wordpress";
import Link from "next/link";
import Image from "next/image";
import "./blog.scss";
import HeroSection from "@/app/components/HeroSection";


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
export default async function BlogPage() {
  const posts = await getPosts();
 

  return (
    <>
      <HeroSection
        title="Blog"
        description="Leave us a little info, and we’ll be in touch."
        image="/assets/images/blog.webp"
        align="center"
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      <div className="blog-container">
        <h1 className="blog-title">Latest Blogs</h1>

        <div className="blog-grid">
          {posts.map((post) => {
            const image =
              post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
                ?.medium_large?.source_url ||
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              null;

            const excerpt = post.excerpt?.rendered
              ?.replace(/<[^>]+>/g, "")
              ?.replace(/&#8230;/g, "...")
              ?.slice(0, 140);

            const formattedDate = new Date(post.date).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            );

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="blog-card"
              >
                <div className="image-wrapper">
                  {image && (
                    <Image
                      src={image}
                      alt={post.title.rendered.replace(/<[^>]+>/g, "")}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="blog-image"
                      priority
                    />
                  )}
                </div>

                <div className="blog-content">
                  <span className="blog-date">{formattedDate}</span>

                  <h2
                    dangerouslySetInnerHTML={{
                      __html: post.title.rendered,
                    }}
                  />

                  <p>{excerpt}...</p>

                  <span className="read-more">Read More →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

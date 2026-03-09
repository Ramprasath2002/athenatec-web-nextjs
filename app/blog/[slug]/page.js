import { getPost, getAllPosts } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "./post.scss";

export default async function PostPage({ params }) {
  const { slug } = await params;

  const post = await getPost(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = allPosts[currentIndex - 1];
  const prevPost = allPosts[currentIndex + 1];

  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // Extract the featured image from the post
  const heroImage =
    post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes
      ?.full?.source_url ||
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    null;

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readTime = Math.ceil(
    post.content.rendered.replace(/<[^>]+>/g, "").split(" ").length / 200
  );

  return (
    <div className="post-wrapper">
       <header className="post-hero">
        {heroImage && (
          <div className="post-hero__bg">
            <Image
              src={heroImage}
              alt={post.title.rendered.replace(/<[^>]+>/g, "")}
              fill
              sizes="100vw"
              className="post-hero__img"
              priority
            />
            <div className="post-hero__overlay" />
          </div>
        )}

        <div className="post-hero__content">
          <Link href="/blog" className="post-hero__back">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 8H3M7 12l-4-4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Blog
          </Link>

          <div className="post-hero__meta">
            <time className="post-hero__date">{formattedDate}</time>
            <span className="post-hero__dot">·</span>
            <span className="post-hero__read">{readTime} min read</span>
          </div>

          <h1
            className="post-hero__title"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </div>
      </header>

       <div className="post-layout">
        <article className="post-article">
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

         
          <nav className="post-nav">
            {prevPost && (
              <Link href={`/blog/${prevPost.slug}`} className="post-nav__item post-nav__item--prev">
                <span className="post-nav__label">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Previous
                </span>
                <span
                  className="post-nav__title"
                  dangerouslySetInnerHTML={{ __html: prevPost.title.rendered }}
                />
              </Link>
            )}
            {nextPost && (
              <Link href={`/blog/${nextPost.slug}`} className="post-nav__item post-nav__item--next">
                <span className="post-nav__label">
                  Next
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span
                  className="post-nav__title"
                  dangerouslySetInnerHTML={{ __html: nextPost.title.rendered }}
                />
              </Link>
            )}
          </nav>
        </article>
      </div>

       {relatedPosts.length > 0 && (
        <section className="related-section">
          <div className="related-header">
            <span className="related-eyebrow">
              <span className="eyebrow-line" />
              Continue Reading
              <span className="eyebrow-line" />
            </span>
          </div>

          <div className="related-grid">
            {relatedPosts.map((item, i) => {
              const img =
                item._embedded?.["wp:featuredmedia"]?.[0]?.media_details
                  ?.sizes?.medium_large?.source_url ||
                item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

              const itemDate = new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              return (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="related-card"
                  style={{ "--i": i }}
                >
                  <div className="related-card__img-wrap">
                    {img ? (
                      <Image
                        src={img}
                        alt={item.title.rendered.replace(/<[^>]+>/g, "")}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="related-card__img"
                      />
                    ) : (
                      <div className="related-card__no-img" />
                    )}
                    <div className="related-card__shine" />
                  </div>
                  <div className="related-card__body">
                    <time className="related-card__date">{itemDate}</time>
                    <h3
                      className="related-card__title"
                      dangerouslySetInnerHTML={{ __html: item.title.rendered }}
                    />
                    <span className="related-card__cta">
                      Read Article
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
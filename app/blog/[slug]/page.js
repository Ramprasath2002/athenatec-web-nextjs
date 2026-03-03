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

  const currentIndex = allPosts.findIndex(p => p.slug === slug);

  const nextPost = allPosts[currentIndex - 1];

  const relatedPosts = allPosts
    .filter(p => p.slug !== slug)
    .slice(0, 2);

  return (
    <div className="post-wrapper">
      <article className="post-container">
        <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>

      {/* Related Posts */}
      <section className="related-section">
        <h2>Related Posts</h2>

        <div className="related-grid">
          {relatedPosts.map((item) => {
            const image =
              item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

            return (
              <Link
                key={item.id}
                href={`/blog/${item.slug}`}
                className="related-card"
              >
                {image && (
                  <Image
                    src={image}
                    alt={item.title.rendered}
                    width={500}
                    height={300}
                  />
                )}
                <h3
                  dangerouslySetInnerHTML={{
                    __html: item.title.rendered,
                  }}
                />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Next Post */}
      {nextPost && (
        <div className="next-post">
          <span>Next Post →</span>
          <Link href={`/blog/${nextPost.slug}`}>
            <h3
              dangerouslySetInnerHTML={{
                __html: nextPost.title.rendered,
              }}
            />
          </Link>
        </div>
      )}
    </div>
  );
}
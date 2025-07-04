import Header from "../components/header";
import Footer from "../components/footer";
import React, { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import useArticleStore from "../stores/articleStore";

export default function ArticlesPage() {
  const { articles, fetchArticles, loading, error, hasMore } =
    useArticleStore();
  const observerRef = useRef();

  // Fetch first page on mount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Infinite scroll logic
  const lastArticleRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchArticles();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <Header />

      <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4 md:px-16 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Latest Articles</h1>

          {error && <p className="text-red-500">{error}</p>}

          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article, i) => {
              const isLast = i === articles.length - 1;
              return (
                <Link
                  ref={isLast ? lastArticleRef : null}
                  to={`/article/${article.slug}`}
                  key={article._id}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h2 className="text-lg font-semibold leading-tight">
                      {article.title}
                    </h2>

                    {/* Author with avatar */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      {article?.author?.avatar && (
                        <img
                          src={article.author.avatar}
                          alt={article.author.username}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      <span>{article?.author?.username || "Timi"}</span>
                      <span>•</span>
                      <span>
                        {new Date(
                          article.date || article.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {article.excerpt ||
                        article.content?.slice(0, 120) + "..."}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Loading and end states */}
          {loading && <p className="text-center mt-6">Loading more...</p>}
          {!hasMore && !loading && (
            <p className="text-center mt-6 text-gray-500">No more articles.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

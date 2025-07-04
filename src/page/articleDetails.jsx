import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLink } from "react-icons/fa";
import { useMoveBack } from "../hooks/useMoveBack";
import { ARTICLE_URL } from "../constants";
import axios from "axios";

const ArticleDetail = () => {
  const { slug } = useParams();
  const moveBack = useMoveBack();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`${ARTICLE_URL}${slug}`);
        setArticle(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching article:", err);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <p className="text-center py-20">Loading article...</p>;
  if (!article) return <p className="text-center py-20">Article not found.</p>;

  return (
    <section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 md:px-16 py-10">
      <button
        onClick={moveBack}
        className="mb-4 text-sm text-blue-500 hover:underline"
      >
        &larr; Back
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Article Image */}
        <img
          src={article.image}
          alt={article.title}
          className="rounded-lg w-full h-64 object-cover mb-6"
        />

        {/* Meta */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium text-black dark:text-white flex">
            <p> By Timi</p>
            <img className="w-6" src={article?.author?.avatar} alt="" />
          </span>
          {new Date(article.publishedAt).toLocaleDateString()}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold mt-2 mb-4 leading-tight">
          {article.title}
        </h1>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-4">
          {article.tags?.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-100 text-xs font-medium px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Share */}
        <div className="flex gap-4 items-center mb-8">
          <span className="text-sm">Share:</span>
          <a href="#" className="hover:text-blue-500">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-green-500">
            <FaLink />
          </a>
        </div>

        {/* Body */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {article.paragraphs?.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleDetail;

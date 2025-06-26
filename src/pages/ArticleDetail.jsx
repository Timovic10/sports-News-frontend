import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    setLoading(true);
    setError(null);

    axios
      .get(`http://localhost:3001/articles/${id}`, {
        cancelToken: source.token,
      })
      .then((res) => {
        setArticle(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError("Error fetching article");
          setLoading(false);
        }
      });

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [id]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return <p>Article not found.</p>;

  // Ensure image URL is complete
  const imageUrl = article.image?.startsWith("http")
    ? article.image
    : `http://localhost:3001${article.image}`;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{article.category}</p>

      {article.image && (
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <p className="text-lg">{article.content}</p>
    </div>
  );
};

export default ArticleDetail;

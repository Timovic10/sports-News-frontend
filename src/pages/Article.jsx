import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/articles/${id}`)
      .then(res => setArticle(res.data))
      .catch(err => console.error('Failed to fetch article:', err));
  }, [id]);

  if (!article) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <p className="text-sm text-gray-500">
        {new Date(article.date).toLocaleDateString()} | {article.category}
      </p>
      <h1 className="text-3xl font-bold my-4">{article.title}</h1>
      {article.image && (
        <img src={article.image} alt={article.title} className="mb-4 w-full rounded" />
      )}
      <div className="text-lg leading-relaxed whitespace-pre-line">{article.content}</div>
    </div>
  );
};

export default Article;

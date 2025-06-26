import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/articles')
      .then((res) => setArticles(res.data))
      .catch((err) => console.error('Failed to fetch articles:', err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {articles.map((article) => (
        <Link
          to={`/article/${article._id}`}
          key={article._id}
          className="border rounded-lg shadow hover:shadow-lg transition duration-300 overflow-hidden"
        >
          {article.image && (
            <img
              src={`http://localhost:3001${article.image}`}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-1">{article.title}</h2>
            <p className="text-sm text-gray-500 mb-2">{article.category}</p>
            <p className="text-gray-700 text-sm line-clamp-3">
              {article.content.slice(0, 100)}...
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;

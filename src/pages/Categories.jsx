import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch all articles
  useEffect(() => {
    axios.get('http://localhost:3001/articles')
      .then((res) => setArticles(res.data))
      .catch((err) => console.error('Failed to load articles:', err));
  }, []);

  // Get unique categories from articles
  const categories = ['All', ...new Set(articles.map(article => article.category))];

  // Filter articles by category
  const filtered = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="flex gap-3 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded border ${
              selectedCategory === cat ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article) => (
          <Link
            to={`/article/${article._id}`}
            key={article._id}
            className="block rounded shadow border hover:shadow-lg transition"
          >
            {article.image && (
              <img
                src={`http://localhost:3001${article.image}`}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{article.title}</h2>
              <p className="text-sm text-gray-500">{article.category}</p>
              <p className="text-sm">{article.content.slice(0, 60)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;

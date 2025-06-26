import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const AdminDashboard = () => {
  const [articles, setArticles] = useState([]);
  const { logout } = useAuth();

  const fetchArticles = () => {
    axios
      .get("http://localhost:3001/articles", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Failed to fetch articles", err));
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchArticles();
    } catch (err) {
      console.error("Failed to delete article", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex items-center gap-2">
          <Link
            to="/admin/create"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Article
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {articles.map((article) => (
        <div
          key={article._id}
          className="border p-4 mb-2 rounded shadow-sm flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold">{article.title}</h3>
            <p className="text-sm text-gray-500">{article.category}</p>
          </div>
          <div className="space-x-2">
            <Link to={`/admin/edit/${article._id}`} className="text-blue-600">
              Edit
            </Link>
            <button
              onClick={() => deleteArticle(article._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;

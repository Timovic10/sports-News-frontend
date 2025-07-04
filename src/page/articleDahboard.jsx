import { useEffect, useState } from "react";
import useArticleStore from "../stores/articleStore";
import { FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ARTICLE_URL } from "../constants";

function ArticleDashboard() {
  const { articles, fetchArticles, resetArticles } = useArticleStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "Football",
    author: "",
    image: null,
    tags: "",
    isTrending: false,
    isRecent: false,
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    resetArticles();
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this article?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${ARTICLE_URL}${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete article");

      resetArticles();
      fetchArticles();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }

      const res = await fetch(`${ARTICLE_URL}`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create article");

      setForm({
        title: "",
        content: "",
        category: "Football",
        author: "",
        image: null,
        tags: "",
        source: "",
        isTrending: false,
        isRecent: false,
      });
      resetArticles();
      fetchArticles();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const uniqueArticles = Array.from(
    new Map(articles.map((article) => [article._id, article])).values()
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold dark:text-white">Articles</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          <FaPlus className="inline mr-2" /> New Article
        </button>
      </div>

      {/* Modal */}
      <dialog open={showModal} className="modal modal-open">
        <div className="modal-box bg-white dark:bg-gray-800">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Create New Article
            </h3>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Content"
              required
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author ID"
              required
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            <input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Tags (comma-separated)"
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            >
              <option>Football</option>
              <option>Basketball</option>
              <option>NFL</option>
              <option>Tennis</option>
              <option>Cycling</option>
              <option>Other</option>
            </select>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isTrending"
                checked={form.isTrending}
                onChange={handleChange}
              />
              <span className="dark:text-white">Trending</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isRecent"
                checked={form.isRecent}
                onChange={handleChange}
              />
              <span className="dark:text-white">Recent</span>
            </label>
            <div className="modal-action">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn bg-gray-300 dark:bg-gray-700 dark:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-blue-600 text-white hover:bg-blue-700"
              >
                <FaPlus className="inline mr-2" /> Submit Article
              </button>
            </div>
            {loading && (
              <p className="text-gray-700 dark:text-white">Processing...</p>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </dialog>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Author</th>
              <th className="p-3">Trending</th>
              <th className="p-3">Recent</th>
              <th className="p-3">Published</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-white">
            {uniqueArticles.map((article) => (
              <tr key={article._id} className="border-t dark:border-gray-600">
                <td className="p-3">{article.title}</td>
                <td className="p-3">{article.category}</td>
                <td className="p-3">{article.author?.username || "admin"}</td>
                <td className="p-3">{article.isTrending ? "Yes" : "No"}</td>
                <td className="p-3">{article.isRecent ? "Yes" : "No"}</td>
                <td className="p-3">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ArticleDashboard;

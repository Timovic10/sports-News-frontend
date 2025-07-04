import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useArticleStore from "../stores/articleStore";
import useAuthStore from "../stores/useAuthStore";

function AdminDashboard() {
  const { articles, fetchArticles } = useArticleStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const stats = articles.reduce((acc, article) => {
    const cat = article.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(stats).map((cat) => ({
    category: cat,
    count: stats[cat],
  }));

  return (
    <div className="p-6 md:p-10 space-y-10 bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          👋 Welcome back, {user?.username || "Admin"}
        </h2>
        <img
          src={user?.avatar}
          alt="Avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-400"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
          <CardContent className="p-5 space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Articles
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {articles.length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
          <CardContent className="p-5 space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Categories
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {Object.keys(stats).length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
          <CardContent className="p-5 space-y-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Latest Author
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {articles[0]?.author?.username || "N/A"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          📊 Articles by Category
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 60 }}>
            <XAxis type="number" allowDecimals={false} hide />
            <YAxis type="category" dataKey="category" />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" radius={[0, 5, 5, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminDashboard;

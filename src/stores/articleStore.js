import { create } from "zustand";
import axios from "axios";
import { ARTICLE_URL } from "../constants";

const useArticleStore = create((set, get) => ({
  articles: [],
  page: 1,
  limit: 10,
  hasMore: true,
  loading: false,
  error: null,
  articleStats: [],

  fetchArticles: async () => {
    const { page, limit, hasMore, loading } = get();
    if (!hasMore || loading) return;

    set({ loading: true });

    try {
      const res = await axios.get(`${ARTICLE_URL}?page=${page}&limit=${limit}`);

      const newArticles = res.data.data;

      set((state) => ({
        articles: [...state.articles, ...newArticles],
        page: state.page + 1,
        hasMore: newArticles.length >= state.limit,
        loading: false,
      }));
    } catch (err) {
      set({ error: "Failed to load articles", loading: false });
    }
  },

  fetchStats: async () => {
    try {
      const res = await axios.get(`${ARTICLE_URL}stats`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      set({ articleStats: res.data });
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  },

  resetArticles: () => {
    set({
      articles: [],
      page: 1,
      hasMore: true,
      loading: false,
      error: null,
    });
  },
}));

export default useArticleStore;

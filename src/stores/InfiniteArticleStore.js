import { create } from "zustand";
import axios from "axios";
import { ARTICLE_URL } from "../constants";

const useInfiniteArticleStore = create((set, get) => ({
  articles: [],
  page: 1,
  limit: 3,
  hasMore: true,
  loading: false,
  error: null,

  fetchInitialArticles: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(`${ARTICLE_URL}?page=1&limit=3`);
      const data = res.data.data;

      set({
        articles: data,
        page: 2,
        hasMore: data.length >= 3,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({ error: "Failed to load articles", loading: false });
    }
  },

  fetchMoreArticles: async () => {
    const { page, limit, hasMore, loading } = get();
    if (!hasMore || loading) return;

    try {
      set({ loading: true });
      const res = await axios.get(`${ARTICLE_URL}?page=${page}&limit=${limit}`);
      const newData = res.data.data;

      set((state) => ({
        articles: [...state.articles, ...newData],
        page: state.page + 1,
        hasMore: newData.length >= limit,
        loading: false,
      }));
    } catch (err) {
      set({ error: "Failed to load more articles", loading: false });
    }
  },

  reset: () => {
    set({
      articles: [],
      page: 1,
      hasMore: true,
      loading: false,
      error: null,
    });
  },
}));

export default useInfiniteArticleStore;

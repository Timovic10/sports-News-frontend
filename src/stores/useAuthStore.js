import { create } from "zustand";
import axios from "axios";
import { AUTH_URL } from "../constants";

axios.defaults.withCredentials = true;

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthReady: false, // ✅ New flag

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post(
        `${AUTH_URL}login`,
        { username, password },
        { withCredentials: true }
      );
      const token = res.data.token;

      localStorage.setItem("token", token);
      set({ token });

      await get().fetchAdmin();
    } catch (err) {
      set({ error: "Login failed", loading: false });
    }
  },

  fetchAdmin: async () => {
    const { token } = get();
    if (!token) return set({ isAuthReady: true }); // ✅ No token means ready

    try {
      const res = await axios.get(`${AUTH_URL}me`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ user: res.data.admin, loading: false, isAuthReady: true }); // ✅ Set ready after fetch
    } catch (err) {
      set({
        user: null,
        token: null,
        error: "Auth failed",
        loading: false,
        isAuthReady: true,
      });
      localStorage.removeItem("token");
    }
  },

  logout: async () => {
    try {
      // Clear the auth cookie on the backend
      await axios.get(`${AUTH_URL}logout`, { withCredentials: true });

      // Remove token from local storage
      localStorage.removeItem("token");

      // Reset auth state
      set({ user: null, token: null, isAuthReady: true });
    } catch (err) {
      console.error("Logout failed:", err);
      // Still clear the local state even if server fails
      localStorage.removeItem("token");
      set({ user: null, token: null, isAuthReady: true });
    }
  },
}));

export default useAuthStore;

import { useState } from "react";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);

    // After login, redirect if no error
    if (!error) navigate("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full flex-col gap-7 items-center justify-center"
    >
      <h1 className="text-2xl font-bold dark:text-white">Login</h1>

      <input
        className="w-80 rounded-md p-2 bg-transparent border border-gray-300 dark:border-gray-100 outline-none"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="w-80 rounded-md p-2 bg-transparent border border-gray-300 dark:border-gray-100 outline-none"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="mt-4 flex gap-2 items-center bg-black text-white py-2 px-6 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log in"}
      </button>
    </form>
  );
}

export default Login;

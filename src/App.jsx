import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/protectedRoute";
import useAuthStore from "./stores/useAuthStore";

const Login = lazy(() => import("./page/login"));
const Home = lazy(() => import("./page/home"));
const ShopDetails = lazy(() => import("./page/articleDetails"));
const Article = lazy(() => import("./page/articles"));

// Admin Dashboard
const Dashboard = lazy(() => import("./page/dashboard"));
const ArticleDahboard = lazy(() => import("./page/articleDahboard"));
const Settings = lazy(() => import("./page/settings"));

function App() {
  // const fetchAdmin = useAuthStore((state) => state.fetchAdmin);
  // const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      useAuthStore.setState({ token });
    }
    useAuthStore.getState().fetchAdmin();
  }, []);

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="text-center mt-20 text-black dark:text-white">
            Loading...
          </div>
        }
      >
        <Routes>
          {/* Default redirect to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="articles" element={<Article />} />
          <Route path="/article/:slug" element={<ShopDetails />} />
          {/* Protected Admin Routes */}

          {/* ✅ Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/articleDahboard" element={<ArticleDahboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

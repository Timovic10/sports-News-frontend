import Footer from "../components/footer";
import Header from "../components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ARTICLE_URL } from "../constants";
import useInfiniteArticleStore from "../stores/infiniteArticleStore";
function Shop() {
  const {
    articles,
    fetchInitialArticles,
    fetchMoreArticles,
    hasMore,
    loading,
    error,
  } = useInfiniteArticleStore();

  const [trending, setTrending] = useState(null);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const fetchHighlight = async () => {
      try {
        const res = await axios.get(`${ARTICLE_URL}getTrendingAndRecentPosts`);
        setTrending(res.data.data.trending);
        setRecent(res.data.data.recent);
      } catch (err) {
        console.error("Failed to fetch highlights:", err);
      }
    };

    fetchInitialArticles();
    fetchHighlight();
  }, []);
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    //   {products.map((product) => (
    //     <ProductCard key={product.id} product={product} />
    //   ))}
    // </div>
    <main style={{ background: "white" }}>
      <Header />
      <section
        // style={{ backgroundColor: "#606c38" }}
        className=" text-white px-4 md:px-16 py-20"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-500">
              Your Daily Dose of <br />
              <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                Sports News.
              </span>
            </h1>
            <p className="text-lg text-gray-500 max-w-md">
              Get real-time coverage, breaking stories, match reports, and
              insider updates across football, basketball, tennis, and more.
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-400 hover:bg-blue-300 transition px-6 py-3 rounded text-white font-medium">
                🔥 Trending News
              </button>
              <button className="border border-gray-400 hover:border-white transition px-6 py-3 rounded text-black">
                🎮 View Categories
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-lg">
            <img
              src="src/assets/bgImg.jpg"
              alt="Sports Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-blue-400 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              FEATURED
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 flex justify-center">
        <img src="src/assets/category.png" alt="" />
      </section>

      <section className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Left Column - Recent News */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent News</h2>
            <div className="flex flex-col gap-4">
              {recent.map((news, index) => (
                <div key={index} className="flex gap-4">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-28 h-20 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-xs text-blue-400">
                      {/* {news?.author?.username} • */}
                      Timi •{new Date(news.createdAt).toLocaleDateString()}
                    </p>
                    <Link to={`/article/${news.slug}`} key={news._id}>
                      <h3 className="text-sm font-semibold leading-snug">
                        {news.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {news.excerpt || news.content?.slice(0, 100) + "..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Trending */}
          {trending && (
            <div className="relative rounded-md overflow-hidden h-[300px] md:h-auto">
              <Link to={`/article/${trending.slug}`} key={trending._id}>
                <img
                  src={trending.image}
                  alt={trending.title}
                  className="w-full h-full object-cover"
                />
              </Link>
              <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 text-xs rounded">
                {trending.category}
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-xs">
                  {/* {trending?.author?.username} • */}
                  Timi •{new Date(trending.createdAt).toLocaleDateString()}
                </p>
                <h2 className="text-lg md:text-xl font-bold leading-tight max-w-[80%]">
                  {trending.title}
                </h2>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-10 md:px-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-6">Featured Articles</h2>

          {error && <p className="text-red-500">{error}</p>}

          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <div key={i} className="space-y-2">
                <div className="relative rounded-md overflow-hidden h-48">
                  <Link to={`/article/${a.slug}`} key={a._id}>
                    <img
                      src={a.image}
                      alt={a.title}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {a.category}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={a?.author?.avatar}
                    alt={a?.author?.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  {/* <p className="text-sm font-medium">{a?.author?.username}</p> */}
                  <p className="text-sm font-medium">Timi</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(a.createdAt).toLocaleDateString()}
                </p>
                <h3 className="text-md font-semibold leading-snug">
                  {a.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {a.excerpt || a.content?.slice(0, 100) + "..."}
                </p>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={fetchMoreArticles}
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Shop;

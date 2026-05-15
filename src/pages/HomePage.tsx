import { useEffect, useState } from "react";
import { listArticles } from "../api/articles";
import ArticleCard from "../components/ArticleCard";
import type { Article } from "../types";

function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listArticles()
      .then((res) => setArticles(res.articles))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="bg-green-500 text-white text-center py-10 mb-8 rounded">
        <h1 className="text-4xl font-bold mb-2">conduit</h1>
        <p className="text-xl">A place to share your knowledge.</p>
      </div>

      {/* Content */}
      <div className="flex gap-6">
        {/* Article List */}
        <div className="flex-1">
          <div className="border-b border-gray-200 mb-4">
            <span className="inline-block border-b-2 border-green-500 text-green-500 pb-2 px-4">
              Global Feed
            </span>
          </div>

          {isLoading && (
            <p className="text-gray-400 text-center py-10">
              Loading articles...
            </p>
          )}

          {!isLoading && articles.length === 0 && (
            <p className="text-gray-400 text-center py-10">
              No articles are here... yet.
            </p>
          )}

          {!isLoading &&
            articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
        </div>

        {/* Sidebar placeholder */}
        <div className="w-56 shrink-0">
          <div className="bg-gray-100 rounded p-4">
            <p className="text-sm font-medium mb-2">Popular Tags</p>
            <p className="text-gray-400 text-sm">Loading tags...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
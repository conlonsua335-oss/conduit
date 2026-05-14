import { useEffect, useState } from "react";
import { listArticles } from "../api/articles";
import { getTags } from "../api/tags";
import ArticleCard from "../components/ArticleCard";
import TagList from "../components/TagList";
import type { Article } from "../types";

function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);

  const [tags, setTags] = useState<string[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(true);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Fetch tags 1 lần khi load
  useEffect(() => {
    getTags()
      .then((res) => setTags(res.tags))
      .catch((err) => console.error(err))
      .finally(() => setIsLoadingTags(false));
  }, []);

  // Fetch articles mỗi khi selectedTag thay đổi
useEffect(() => {
  let cancelled = false;

  const fetchArticles = async () => {
    try {
      const res = await listArticles(10, 0, selectedTag ?? undefined);
      if (!cancelled) {
        setArticles(res.articles);
        setIsLoadingArticles(false);
      }
    } catch (err) {
      console.error(err);
      if (!cancelled) setIsLoadingArticles(false);
    }
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setIsLoadingArticles(true);
  fetchArticles();

  return () => {
    cancelled = true;
  };
}, [selectedTag]);

  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

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
            {selectedTag ? (
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedTag(null)}
                  className="pb-2 px-4 text-gray-500 hover:text-gray-900"
                >
                  Global Feed
                </button>
                <span className="inline-block border-b-2 border-green-500 text-green-500 pb-2 px-4">
                  # {selectedTag}
                </span>
              </div>
            ) : (
              <span className="inline-block border-b-2 border-green-500 text-green-500 pb-2 px-4">
                Global Feed
              </span>
            )}
          </div>

          {isLoadingArticles && (
            <p className="text-gray-400 text-center py-10">
              Loading articles...
            </p>
          )}

          {!isLoadingArticles && articles.length === 0 && (
            <p className="text-gray-400 text-center py-10">
              No articles are here... yet.
            </p>
          )}

          {!isLoadingArticles &&
            articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
        </div>

        {/* Sidebar */}
        <div className="w-56 flex-shrink-0">
          <TagList
            tags={tags}
            selectedTag={selectedTag}
            isLoading={isLoadingTags}
            onTagClick={handleTagClick}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
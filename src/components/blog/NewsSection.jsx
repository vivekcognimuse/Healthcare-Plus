"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getBlogs } from "@/lib/strapi";
import DataInspector from "@/components/debug/DataInspector";

// Simple blog card component that works with flattened blog data
const BlogCard = ({ blog, isFeatured = false }) => {
  if (!blog) return null;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "No date available";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return "Invalid date";
    }
  };

  // Get excerpt
  const getExcerpt = (content, maxLength = 200) => {
    if (!content) return "No content available";
    // Remove HTML tags
    const plainText = content.replace(/<[^>]*>/g, "");
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + "...";
  };

  if (isFeatured) {
    return (
      <div className="border-b  border-gray-200 pb-8 mb-8">
        <div className="mb-2">
          <span className="text-gray-700">{formatDate(blog.PublishDate)}</span>
        </div>

        <h2 className="text-2xl font-normal mb-4">
          <Link href={`/news/${blog.Slug}`} className="hover:underline">
            {blog.Title}
          </Link>
        </h2>

        <div className="bg-white p-6 rounded-md mb-4">
          <p className="text-xl font-light">{getExcerpt(blog.Content)}</p>
        </div>

        <Link
          href={`/news/${blog.Slug}`}
          className="inline-block border border-gray-800 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors">
          Read More
        </Link>
      </div>
    );
  }

  return (
    <div className="border-b  border-gray-200 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">
            <Link href={`/news/${blog.Slug}`} className="hover:underline">
              {blog.Title}
            </Link>
          </h3>
          <div className="text-sm text-gray-600 flex space-x-3">
            <span>{blog.Category || "Uncategorized"}</span>
            <span>{formatDate(blog.PublishDate)}</span>
          </div>
        </div>
        <Link
          href={`/news/${blog.Slug}`}
          className="bg-white rounded-md px-4 py-2 text-sm border hover:bg-gray-50">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default function NewsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugData, setDebugData] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);

        // Add a small delay to ensure Strapi has time to respond
        await new Promise((resolve) => setTimeout(resolve, 500));

        const response = await getBlogs(1, 3); // Get latest 3 blogs
        console.log("Blogs response:", response);

        setDebugData(response); // Store full response for debugging

        // Validate the response structure
        if (response && response.data && Array.isArray(response.data)) {
          // Filter out invalid blog entries
          const validBlogs = response.data.filter(
            (blog) =>
              blog && typeof blog === "object" && blog.Title && blog.Slug
          );

          if (validBlogs.length > 0) {
            console.log(
              `Found ${validBlogs.length} valid blogs out of ${response.data.length} total`
            );
            setBlogs(validBlogs);
          } else {
            console.warn("No valid blogs found in the response data");
            setError("No valid blog posts available");
          }
        } else {
          console.warn("Unexpected response format:", response);
          setError("Failed to load latest news");
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs for homepage:", err);
        setError(`Failed to load latest news: ${err.message}`);
        setDebugData({ error: err.message, stack: err.stack });
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className=" py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <span className="bg-gray-300 text-gray-700 px-4 py-1 rounded-full text-sm">
              Recent
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-8">In the News</h2>
          <div className="animate-pulse">
            <div className="h-32 bg-gray-300 rounded mb-4"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" py-24">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <span className="bg-black text-white px-4 py-1 rounded-full text-sm">
            Recent
          </span>
        </div>

        <h2 className="text-6xl mb-8">
          <span className="font-light">In the </span>
          <span className="font-normal">News</span>
        </h2>

        {/* Debug data inspector (only shown in development) */}
        {/* {process.env.NODE_ENV !== "production" && (
          <DataInspector data={debugData} label="Strapi Response" />
        )} */}

        {error || blogs.length === 0 ? (
          <div>
            <p>{error || "No news articles available at the moment."}</p>
            {blogs.length === 0 && debugData && (
              <p className="mt-2 text-sm text-gray-500">
                Data was fetched but no valid blogs were found.
              </p>
            )}
          </div>
        ) : (
          <>
            {/* Featured blog (first item) */}
            {blogs.length > 0 && (
              <BlogCard
                key={`featured-${blogs[0].id}`}
                blog={blogs[0]}
                isFeatured={true}
              />
            )}

            {/* Other blogs */}
            {blogs.length > 1 && (
              <div className="space-y-2">
                {blogs.slice(1).map((blog) => (
                  <BlogCard key={blog.id} blog={blog} isFeatured={false} />
                ))}
              </div>
            )}
          </>
        )}

        <div className="mt-8 text-right">
          <Link href="/news" className="text-gray-700 hover:underline">
            View All News
          </Link>
        </div>
      </div>
    </div>
  );
}

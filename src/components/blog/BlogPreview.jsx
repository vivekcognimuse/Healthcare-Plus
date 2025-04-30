"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { getStrapiURL } from "@/lib/strapi";

export default function BlogPreview({ blog, isFeatured = false }) {
  // Full validation of blog data before processing
  if (!blog) {
    console.log("BlogPreview received undefined or null blog");
    return null;
  }

  if (typeof blog !== "object") {
    console.log("BlogPreview received non-object blog:", typeof blog);
    return null;
  }

  if (!blog.attributes || typeof blog.attributes !== "object") {
    console.log("BlogPreview received blog without valid attributes:", blog);
    return null;
  }

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "No date available";
    try {
      return format(new Date(dateString), "MMMM d, yyyy");
    } catch (e) {
      console.error("Date formatting error:", e);
      return "Invalid date";
    }
  };

  // Get image URL
  const getImageUrl = (image) => {
    if (!image || !image.data) return "/placeholder-image.jpg";
    return getStrapiURL(image.data.attributes.url);
  };

  // Extract a clean excerpt from the content
  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return "No content available";
    // Remove HTML tags
    const plainText = content.replace(/<[^>]*>/g, "");
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + "...";
  };

  // Extract quoted text if available
  const getQuote = (content) => {
    if (!content) return "";
    if (content.includes('"')) {
      const match = content.match(/"([^"]*)"/);
      if (match && match[1]) {
        return match[1].length > 150
          ? match[1].substring(0, 150) + "..."
          : match[1];
      }
    }
    return "";
  };

  // Log available attributes for debugging
  console.log("Blog attributes available:", Object.keys(blog.attributes));

  // Direct access using field names as they appear in Strapi's response with ultra-defensive coding
  const attrs = blog.attributes || {};
  const title =
    attrs.Title !== undefined
      ? attrs.Title
      : attrs.title !== undefined
      ? attrs.title
      : "Untitled Post";

  const slug =
    attrs.Slug !== undefined
      ? attrs.Slug
      : attrs.slug !== undefined
      ? attrs.slug
      : blog.id !== undefined
      ? blog.id
      : "unknown";

  const category =
    attrs.Category !== undefined
      ? attrs.Category
      : attrs.category !== undefined
      ? attrs.category
      : "Uncategorized";

  const publishDate =
    attrs.PublishDate !== undefined
      ? attrs.PublishDate
      : attrs.publishDate !== undefined
      ? attrs.publishDate
      : null;

  const content =
    attrs.Content !== undefined
      ? attrs.Content
      : attrs.content !== undefined
      ? attrs.content
      : "";

  const thumbnail =
    attrs.Thumbnail !== undefined
      ? attrs.Thumbnail
      : attrs.thumbnail !== undefined
      ? attrs.thumbnail
      : null;

  if (isFeatured) {
    // Featured blog preview (larger with more details)
    return (
      <div className="border-b border-gray-200 pb-8 mb-8">
        <div className="mb-2">
          <span className="text-gray-700">{formatDate(publishDate)}</span>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          <Link href={`/news/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h2>

        {thumbnail && thumbnail.data && (
          <div className="mb-4">
            <Image
              src={getImageUrl(thumbnail)}
              alt={title}
              width={600}
              height={300}
              className="rounded-md w-full h-auto"
            />
          </div>
        )}

        <div className="bg-white p-6 rounded-md mb-4">
          <p className="text-gray-800">{getExcerpt(content, 300)}</p>

          {getQuote(content) && (
            <blockquote className="italic text-gray-700 mt-4 border-l-4 border-gray-300 pl-4">
              "{getQuote(content)}"
            </blockquote>
          )}
        </div>

        <Link
          href={`/news/${slug}`}
          className="inline-block border border-gray-800 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors"
        >
          Read More
        </Link>
      </div>
    );
  }

  // Standard blog preview (smaller with less details)
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">
            <Link href={`/news/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="text-sm text-gray-600 flex space-x-3">
            <span>{category}</span>
            <span>{formatDate(publishDate)}</span>
          </div>
        </div>
        <Link
          href={`/news/${slug}`}
          className="bg-white rounded-md px-4 py-2 text-sm border hover:bg-gray-50"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

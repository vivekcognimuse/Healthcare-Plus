"use client";

import React from "react";
import { getStrapiURL } from "@/lib/strapi";

// Component to properly render rich text content from Strapi
export default function RichText({ content }) {
  if (!content) {
    return <p className="text-gray-500 italic">No content available.</p>;
  }

  // Function to process and enhance HTML content
  const processContent = (htmlContent) => {
    try {
      // Format plain text with paragraphs
      if (!htmlContent.includes("<p>") && !htmlContent.includes("<div>")) {
        // Convert plain text to paragraphs
        return htmlContent
          .split("\n\n")
          .map((para) => `<p>${para}</p>`)
          .join("");
      }

      // Replace image sources with full URLs (if you're using media in rich text)
      let processedContent = htmlContent.replace(
        /<img[^>]*src="([^"]*)"[^>]*>/g,
        (match, src) => {
          // If src is already a full URL, don't modify
          if (src.startsWith("http")) {
            return match;
          }

          // Otherwise, prepend the Strapi URL
          const fullSrc = getStrapiURL(src);
          return match.replace(src, fullSrc);
        }
      );

      return processedContent;
    } catch (error) {
      console.error("Error processing rich text content:", error);
      return htmlContent; // Return original content if processing fails
    }
  };

  // Safely render content
  const renderContent = () => {
    try {
      return (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: processContent(content) }}
        />
      );
    } catch (error) {
      console.error("Error rendering rich text:", error);
      return (
        <div className="p-4 bg-red-50 text-red-700 rounded">
          <p>Error rendering content. Please try refreshing the page.</p>
          <details className="mt-2 text-sm">
            <summary>Technical details</summary>
            <p className="mt-1">{error.message}</p>
          </details>
        </div>
      );
    }
  };

  return <div className="rich-text-content">{renderContent()}</div>;
}

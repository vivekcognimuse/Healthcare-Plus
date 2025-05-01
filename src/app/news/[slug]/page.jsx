import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { getBlogBySlug, getRelatedBlogs, getStrapiURL } from "@/lib/strapi";
import RichText from "@/components/blog/RichText";
import DataInspector from "@/components/debug/DataInspector";
import Footer from "@/components/Footer";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

// Generate metadata for the page
export async function generateMetadata({ params }) {
  // Need to await params in Next.js 15.3.1
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${blog.Title || "Blog Post"} | Crumpler Health`,
    description: blog.Content
      ? blog.Content.substring(0, 160).replace(/<[^>]*>/g, "")
      : "Blog post details",
  };
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
  if (!image || !image[0]) return "/assets/checker.webp";
  return getStrapiURL(image[0].url);
};

export default async function BlogDetail({ params }) {
  // Need to await params in Next.js 15.3.1
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  // Fetch the blog post
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Fetch related blogs
  const relatedResponse = await getRelatedBlogs(slug, blog.Category, 2);

  const relatedBlogs = relatedResponse?.data || [];
  const showDebugInfo = process.env.NODE_ENV !== "production";

  return (
    <>
      <div className=" max-w-[1480px] p-side mx-auto min-h-screen">
        {/* Hero Image Section - 60% of screen height */}
        {blog.Thumbnail && blog.Thumbnail.length > 0 && (
          <div className="relative w-full h-[60vh] overflow-hidden">
            <Image
              src={getImageUrl(blog.Thumbnail)}
              alt={blog.Title}
              layout="fill"
              objectFit="cover"
              priority
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Blog Content Container */}
        <div className="container mx-auto px-4 py-8 -mt-16 relative z-10">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="top-0 left-0 right-0 p-4 pt-6 ">
              <div className="container mx-auto">
                <Link
                  href="/news"
                  className="inline-flex text-xl items-center font-light text-black hover:font-normal">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Return to News
                </Link>
              </div>
            </div>
            {/* Blog header */}
            <div className="mb-4 flex justify-between items-center">
              <span className="inline-block bg-black text-white px-4 py-1 rounded-full text-[16px] font-light">
                {blog.Category || "Uncategorized"}
              </span>
              <span className="text-light text-[16px]">
                {blog.ReadTime || "5"} Min Read
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-normal text-black/80 mb-8">
              {blog.Title}
            </h1>

            <div className="flex items-center mb-8">
              <div className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center text-lg font-semibold mr-3">
                {blog.authorName ? blog.authorName.charAt(0) : "A"}
              </div>
              <div>
                <div className="font-medium">{blog.authorName || "Author"}</div>
                <div className="text-sm text-gray-600">
                  {formatDate(blog.PublishDate)}
                </div>
              </div>
            </div>

            {/* Blog content */}
            <RichText content={blog.Content || ""} />
          </div>

          {/* Related blogs section - Updated design */}
          {relatedBlogs.length > 0 && (
            <div className="mt-12 mb-16">
              <h2 className="text-2xl font-bold mb-6 border-l-4 border-black pl-4">
                Next Up
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedBlogs.map((relatedBlog) => (
                  <div
                    key={relatedBlog.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                    {relatedBlog.Thumbnail &&
                    relatedBlog.Thumbnail.length > 0 ? (
                      <div className="h-40 overflow-hidden">
                        <Image
                          src={getStrapiURL(relatedBlog.Thumbnail[0].url)}
                          alt={relatedBlog.Title}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-40 bg-gray-200"></div>
                    )}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="text-sm text-gray-600 mb-2">
                        {relatedBlog.Category || "Uncategorized"}
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {relatedBlog.Title || "Untitled Post"}
                      </h3>
                      <div className="text-sm text-gray-500 mb-2">
                        {formatDate(relatedBlog.PublishDate)}
                      </div>
                      <div className="mt-auto pt-3">
                        <Link
                          href={`/news/${relatedBlog.Slug}`}
                          className="bg-black text-white rounded-md px-4 py-2 text-sm hover:bg-gray-800 inline-block">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-right">
                <Link
                  href="/news"
                  className="text-black font-medium hover:underline">
                  View All
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

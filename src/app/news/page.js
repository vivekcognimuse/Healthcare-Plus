import Link from 'next/link';
import { format } from 'date-fns';
import { getBlogs } from '@/lib/strapi';
import PaginationControls from '@/components/blog/PaginationControl';
import Image from 'next/image';
import checker from '@/../public/assets/checker.webp';

// Helper function to get the full image URL
const getImageUrl = (thumbnail) => {
  if (!thumbnail || !Array.isArray(thumbnail) || thumbnail.length === 0) {
    return checker; // fallback imported image
  }

  const imageUrl = thumbnail[0]?.url;
  if (!imageUrl) return checker;

  // If the url is already absolute (starts with "http"), use it
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // Otherwise, prepend your Strapi backend URL
  return `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageUrl}`;
};



// Generate metadata for the page
export const metadata = {
  title: 'What\'s New? | Crumpler Health',
  description: 'Latest news and updates from Crumpler Health',
};

// This makes the page dynamically rendered at request time
export const dynamic = 'force-dynamic';

// Default page size
const PAGE_SIZE = 6;

// Format date function
const formatDate = (dateString) => {
  if (!dateString) return "No date available";
  try {
    return format(new Date(dateString), "MM/dd/yyyy");
  } catch (e) {
    console.error("Date formatting error:", e);
    return "Invalid date";
  }
};

export default async function NewsPage({ searchParams }) {
  // Need to await searchParams in Next.js 15.3.1 before accessing its properties
  const params = await Promise.resolve(searchParams);
  
  // Get page number from URL query params or default to 1
  const page = params?.page ? parseInt(params.page) : 1;
  const category = params?.category || null;
  
  // Fetch blogs data
  let blogs = [];
  let pagination = {
    page: 1,
    pageSize: PAGE_SIZE,
    pageCount: 1,
    total: 0,
  };
  
  try {
    console.log("Fetching blogs with page:", page, "category:", category);
    const response = await getBlogs(page, PAGE_SIZE, category);
    
    // Check if we have a valid response with data
    if (response && response.data && Array.isArray(response.data)) {
      // Filter out invalid blog entries
      blogs = response.data.filter(blog => 
        blog && typeof blog === 'object' && blog.Title && blog.Slug
      );
      
      if (blogs.length > 0) {
        console.log('First blog data:', {
          id: blogs[0].id,
          title: blogs[0].Title,
          slug: blogs[0].Slug,
          fields: Object.keys(blogs[0])
        });
      } else {
        console.log('No valid blog posts found in the response data array');
      }
    } else {
      console.log('Invalid or empty response structure:', response);
    }
    
    // Get pagination info if available
    pagination = response?.meta?.pagination || pagination;
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
  
  // Featured blogs (first 4)
  const featuredBlogs = blogs.slice(0, 4);
  
  return (
    <div className="bg-transparent min-h-screen  md:pt-[10%]">
      <div className="container mx-auto">
        <h1 className="text-7xl font-light text-black/80 mb-12">What's New?</h1>
        
        {/* Featured Articles Grid */}
        {featuredBlogs.length > 0 && (
  <div className="grid grid-cols-1 gap-6 mb-16">
    {/* Process featured blogs in pairs */}
    {Array.from({ length: Math.ceil(featuredBlogs.length / 2) }).map((_, pairIndex) => {
      const firstBlog = featuredBlogs[pairIndex * 2];
      const secondBlog = featuredBlogs[pairIndex * 2 + 1];
      
      // Alternate the layout for each row
      const isAlternateRow = pairIndex % 2 !== 0;

      return (
        <div key={pairIndex} className="grid grid-cols-1 md:grid-cols-10 gap-6">
          {/* First Blog in Pair */}
          {firstBlog && (
            <div className={`relative rounded-lg overflow-hidden shadow-md bg-gray-100 cursor-pointer ${
              isAlternateRow ? 'md:col-span-3' : 'md:col-span-7'
            }`}>
              <Link href={`/news/${firstBlog.Slug}`}>
                {firstBlog.Thumbnail && firstBlog.Thumbnail.length > 0 ? (
                  <div className="relative h-64 w-full">
                    <Image 
                      src={getImageUrl(firstBlog.Thumbnail)}
                      alt={firstBlog.Title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-64 w-full bg-gray-200">
                    <Image 
                      src={checker}
                      alt="Placeholder"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <div className="mb-2">
                    <span className="text-sm font-medium bg-black/40 px-2 py-1 rounded">
                      {firstBlog.ReadTime || '3'} min Read
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold">{firstBlog.Title}</h2>
                </div>
              </Link>
            </div>
          )}

          {/* Second Blog in Pair */}
          {secondBlog && (
            <div className={`relative rounded-lg overflow-hidden shadow-md bg-gray-100 cursor-pointer ${
              isAlternateRow ? 'md:col-span-7' : 'md:col-span-3'
            }`}>
              <Link href={`/news/${secondBlog.Slug}`}>
                {secondBlog.Thumbnail && secondBlog.Thumbnail.length > 0 ? (
                  <div className="relative h-64 w-full">
                    <Image 
                      src={getImageUrl(secondBlog.Thumbnail)}
                      alt={secondBlog.Title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-64 w-full bg-gray-200">
                    <Image 
                      src={checker}
                      alt="Placeholder"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded text-sm font-medium">
                  {secondBlog.ReadTime || (pairIndex * 2 + 4)} min Read
                </div>
              </Link>
            </div>
          )}
        </div>
      );
    })}
  </div>
)}
        
        {/* All Posts Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-light">All Posts</h2>
            <button className="text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </button>
          </div>
          
          {blogs.length === 0 ? (
            <div className="text-center py-10">
              <p>No blog posts found.</p>
            </div>
          ) : (
            <div className="border-t border-gray-200">
              {blogs.map((blog) => (
                <div key={blog.id} className="py-6 border-b border-black/80">
                  <div className="flex justify-between items-center">
                    <Link href={`/news/${blog.Slug}`} className="flex-1">
                      <h3 className="text-xl font-normal hover:text-blue-600 transition-colors">{blog.Title}</h3>
                    </Link>
                    <div className="flex items-center space-x-16 px-8">
                      <span className="text-xl text-black/80">{formatDate(blog.PublishDate)}</span>
                      <Link href={`/news/${blog.Slug}`} className="text-xl text-blue-600 font-medium hover:underline">
                        View Post
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {pagination.pageCount > 1 && (
            <div className="mt-8">
              <PaginationControls 
                totalPages={pagination.pageCount} 
                currentPage={pagination.page} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
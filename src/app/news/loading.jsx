export default function Loading() {
  return (
    <div className="bg-gray-100 min-h-screen pb-16">
      {/* Navigation bar */}
      <div className="bg-gray-200 p-4">
        <div className="container mx-auto">
          <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Blog header */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <div className="inline-block bg-gray-300 w-24 h-6 rounded-full animate-pulse"></div>
          <div className="inline-block ml-4 bg-gray-300 w-24 h-6 rounded animate-pulse"></div>
        </div>

        <div className="w-3/4 h-10 bg-gray-300 rounded animate-pulse mb-8"></div>

        <div className="flex items-center mb-8">
          <div className="bg-gray-300 rounded-full h-10 w-10 animate-pulse mr-3"></div>
          <div>
            <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-24 h-4 bg-gray-300 rounded animate-pulse mt-1"></div>
          </div>
        </div>

        {/* Blog content */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="w-full h-64 bg-gray-300 rounded animate-pulse mb-8"></div>

          <div className="space-y-4">
            <div className="bg-gray-200 h-4 rounded w-full animate-pulse"></div>
            <div className="bg-gray-200 h-4 rounded w-full animate-pulse"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4 animate-pulse"></div>
            <div className="bg-gray-200 h-4 rounded w-full animate-pulse"></div>
            <div className="bg-gray-200 h-4 rounded w-5/6 animate-pulse"></div>
            <div className="bg-gray-200 h-4 rounded w-full animate-pulse"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4 animate-pulse"></div>
          </div>
        </div>

        {/* Related blogs section */}
        <div>
          <div className="w-36 h-8 bg-gray-300 rounded animate-pulse mb-6"></div>

          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-md p-4 flex justify-between items-center"
              >
                <div>
                  <div className="w-48 h-6 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded animate-pulse mt-1"></div>
                </div>
                <div className="bg-white w-24 h-8 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

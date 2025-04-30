"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function PaginationControls({ totalPages, currentPage }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage === currentPage) return; // Don't navigate if same page

    // Create new URL with updated page parameter
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());

    // Preserve any other existing parameters
    const category = searchParams.get("category");
    if (category) {
      params.set("category", category);
    }

    // Navigate to the new URL
    router.push(`${pathname}?${params.toString()}`);
  };

  // Don't render pagination if there's only one page or less
  if (totalPages <= 1) {
    return null;
  }

  // Create array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always include first page
    pageNumbers.push(1);

    // Add current page and pages around it
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }

    // Always include last page if there's more than one page
    if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }

    // Sort page numbers
    return pageNumbers.sort((a, b) => a - b);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-12 space-x-2">
      {/* Previous page button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-gray-300 text-gray-800 hover:bg-gray-400"
        }`}
        aria-label="Previous page"
      >
        Previous
      </button>

      {/* Page number buttons */}
      {pageNumbers.map((pageNumber, index) => {
        // Add ellipsis if there's a gap in page numbers
        const showEllipsisBefore =
          index > 0 && pageNumber > pageNumbers[index - 1] + 1;

        return (
          <React.Fragment key={`page-${pageNumber}`}>
            {showEllipsisBefore && (
              <span className="px-4 py-2 rounded bg-gray-200 text-gray-600">
                …
              </span>
            )}
            <button
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 rounded ${
                currentPage === pageNumber
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
              aria-label={`Page ${pageNumber}`}
              aria-current={currentPage === pageNumber ? "page" : undefined}
            >
              {pageNumber}
            </button>
          </React.Fragment>
        );
      })}

      {/* Next page button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-gray-300 text-gray-800 hover:bg-gray-400"
        }`}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}

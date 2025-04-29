// lib/strapi.js
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = '') {
  return `${API_URL}${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Build request URL
  const queryString = new URLSearchParams(urlParamsObject).toString();
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ''}`
  )}`;
  
  console.log('Requesting URL:', requestUrl);

  try {
    const response = await fetch(requestUrl, mergedOptions);
    
    if (!response.ok) {
      console.error('Error response:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error details:', errorText);
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Log API response structure for debugging
    if (data.data && data.data.length > 0) {
      console.log(`Received ${data.data.length} items from API`);
      // Log first item's structure
      const firstItem = data.data[0];
      console.log('First blog data:', {
        id: firstItem.id,
        title: firstItem.Title || 'No title found',
        fields: Object.keys(firstItem)
      });
    } else {
      console.log('API returned empty data array or unexpected structure');
      console.log('Full response structure:', Object.keys(data));
    }
    
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

/**
 * Get blogs from Strapi
 * Includes pagination and filtering options
 * @param {number} page Page number for pagination
 * @param {number} pageSize Number of items per page
 * @param {string} category Filter by category
 * @returns Blog articles and metadata
 */
export async function getBlogs(page = 1, pageSize = 10, category = null) {
  const path = '/blogs';
  
  // Use proper field names based on your Strapi setup
  const urlParamsObject = {
    'populate': '*',
    'sort[0]': 'PublishDate:desc',
    'pagination[page]': page,
    'pagination[pageSize]': pageSize,
  };
  
  // Add category filter if provided
  if (category) {
    urlParamsObject['filters[Category][$eq]'] = category;
  }

  console.log('Fetching blogs with params:', urlParamsObject);
  
  try {
    const response = await fetchAPI(path, urlParamsObject);
    
    // Add defensive checks to protect against empty responses
    if (!response || !response.data) {
      console.warn('Empty or invalid response received:', response);
      return { data: [], meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } } };
    }
    
    return response;
  } catch (error) {
    console.error('Error in getBlogs:', error);
    // Return empty data structure to avoid breaking the UI
    return { data: [], meta: { pagination: { page, pageSize, pageCount: 0, total: 0 } } };
  }
}

/**
 * Get a single blog by slug
 * @param {string} slug Blog slug
 * @returns Single blog with all populated fields
 */
export async function getBlogBySlug(slug) {
  const path = '/blogs';
  const urlParamsObject = {
    'filters[Slug][$eq]': slug,
    'populate': '*'
  };
  
  try {
    const response = await fetchAPI(path, urlParamsObject);
    
    if (!response || !response.data || response.data.length === 0) {
      console.warn(`Blog with slug '${slug}' not found.`);
      return null;
    }
    
    // Return the blog data directly (not nested under attributes)
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching blog with slug '${slug}':`, error);
    return null;
  }
}

/**
 * Get related blogs based on category
 * @param {string} currentSlug Slug of current blog to exclude
 * @param {string} category Category to match
 * @param {number} limit Number of related blogs to fetch
 * @returns Related blogs
 */
export async function getRelatedBlogs(currentSlug, category, limit = 2) {
  const path = '/blogs'; // Using correct collection name
  const urlParamsObject = {
    'filters[Slug][$ne]': currentSlug,
    'filters[Category][$eq]': category,
    'pagination[limit]': limit,
    'populate': '*',
    'sort[0]': 'PublishDate:desc'
  };
  
  try {
    const response = await fetchAPI(path, urlParamsObject);
    console.log('Related blogs response:', response);
    return response;
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    return { data: [] };
  }
}
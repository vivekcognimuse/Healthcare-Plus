// lib/api-debug.js
export async function testStrapiAPI() {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
    
    try {
      console.log('Testing Strapi API connection...');
      console.log('API URL:', API_URL);
      
      // Test basic API connection
      const response = await fetch(`${API_URL}/api/blogs?populate=*`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      console.log('API Connection successful!');
      console.log('Total blogs found:', data.meta?.pagination?.total || 'N/A');
      console.log('First blog ID:', data.data?.[0]?.id || 'N/A');
      
      // Log available fields for the first blog post if available
      if (data.data && data.data.length > 0) {
        const firstBlog = data.data[0];
        console.log('First blog attributes:', Object.keys(firstBlog.attributes || {}));
        
        // Print each attribute's value type to debug case sensitivity issues
        if (firstBlog.attributes) {
          console.log('Attribute details:');
          Object.entries(firstBlog.attributes).forEach(([key, value]) => {
            console.log(`- ${key}: ${typeof value} ${Array.isArray(value) ? '(array)' : ''}`);
            
            // If it's an object with a data property (typical for media fields)
            if (value && typeof value === 'object' && 'data' in value) {
              console.log(`  └─ Has 'data' property: ${value.data !== null}`);
            }
          });
        }
      }
      
      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('API Test Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
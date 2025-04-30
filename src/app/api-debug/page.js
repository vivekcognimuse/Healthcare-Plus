'use client';

import { useState, useEffect } from 'react';
import { testStrapiAPI } from '@/lib/api-debug';

export default function ApiDebugPage() {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function runTest() {
      try {
        setLoading(true);
        const testResult = await testStrapiAPI();
        setResult(testResult);
      } catch (err) {
        console.error('Error running API test:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    runTest();
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Strapi API Debug Page</h1>
      
      {loading && (
        <div className="p-4 bg-gray-100 rounded">
          <p>Testing API connection...</p>
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded mb-6">
          <h2 className="font-bold">Error:</h2>
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div className="space-y-6">
          <div className="p-4 bg-gray-100 rounded">
            <h2 className="font-bold mb-2">Connection Status:</h2>
            <p className={result.success ? "text-green-600" : "text-red-600"}>
              {result.success ? "✅ Connection Successful" : "❌ Connection Failed"}
            </p>
          </div>
          
          {result.data && (
            <div className="p-4 bg-gray-100 rounded">
              <h2 className="font-bold mb-2">Data Summary:</h2>
              <ul className="list-disc pl-6">
                <li>Total blogs: {result.data.meta?.pagination?.total || "N/A"}</li>
                <li>Page count: {result.data.meta?.pagination?.pageCount || "N/A"}</li>
                <li>Items received: {result.data.data?.length || 0}</li>
              </ul>
              
              {result.data.data && result.data.data.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">First Blog Details:</h3>
                  <pre className="bg-gray-200 p-3 rounded overflow-auto max-h-96 text-sm">
                    {JSON.stringify(result.data.data[0], null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="mt-8">
        <p className="text-sm text-gray-500">
          This page helps debug Strapi API connections. Visit <a href="/news" className="underline">the news page</a> to see the actual implementation.
        </p>
      </div>
    </div>
  );
}
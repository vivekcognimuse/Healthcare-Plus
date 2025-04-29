"use client";

import { useState } from "react";

/**
 * A component to help inspect and debug data structures
 * Only visible in development mode
 */
export default function DataInspector({
  data,
  label = "Data Inspector",
  expanded = false,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  // Only show in development
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Format data for display
  const formatData = (data) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (error) {
      return `[Error formatting data: ${error.message}]`;
    }
  };

  // Get type and structure info
  const getTypeInfo = (data) => {
    if (data === null) return "null";
    if (data === undefined) return "undefined";

    const type = typeof data;

    if (type === "object") {
      if (Array.isArray(data)) {
        return `Array(${data.length})`;
      }
      return `Object with ${Object.keys(data).length} keys`;
    }

    return type;
  };

  return (
    <div className="my-4 border border-gray-300 rounded">
      <div
        className="p-2 bg-gray-100 flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="font-medium">🔍 {label}</div>
        <div className="text-xs text-gray-500">{getTypeInfo(data)}</div>
        <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {isExpanded && (
        <div
          className="p-2 overflow-auto bg-gray-50 text-xs font-mono"
          style={{ maxHeight: "400px" }}
        >
          <pre>{formatData(data)}</pre>
        </div>
      )}
    </div>
  );
}

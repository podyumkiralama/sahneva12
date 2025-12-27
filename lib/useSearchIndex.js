"use client";

import { useEffect, useState } from "react";

export default function useSearchIndex() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await fetch("/api/search-index");
        if (!response.ok) throw new Error("Search index fetch failed");
        const data = await response.json();
        if (isMounted) {
          setRoutes(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) setRoutes([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { routes, loading };
}

import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function useFetch(URL) {
  let [product, setProduct] = useState([]);
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      let response = await axios.get(URL); // Axios is very easy to use and it is developer friendly!
      // Parse rating if it's a string (from JSONB)
      const products = response.data.map(item => ({
        ...item,
        rating: typeof item.rating === 'string' ? JSON.parse(item.rating) : item.rating
      }));
      setProduct(products);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { product, error, isLoading, setProduct, refresh: fetchData };
}

export default useFetch;

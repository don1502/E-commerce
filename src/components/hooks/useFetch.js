import { useEffect, useState } from "react";

function useFetch(URL) {
  let [product, setProduct] = useState([]);
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let fetchApi = async () => {
      try {
        let response = await fetch(URL);
        if (response.ok) {
          let data = await response.json();
          setProduct(data);
        } else {
          throw new Error("Data not found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApi();
  }, []);
  return { product, error, isLoading };
}

export default useFetch;

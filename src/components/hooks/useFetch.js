import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(URL) {
  let [product, setProduct] = useState([]);
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let fetchApi = async () => {
      try {
        let response = await axios.get(URL); // Axios is very easy to use and it is developer friendly!
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApi();
  }, []);
  return { product, error, isLoading, setProduct };
}

export default useFetch;

import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log( "t" + process.env.REACT_APP_API_URL);
        const res = await makeRequest.get(url);
        setData(res.data.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

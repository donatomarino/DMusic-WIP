import { useState } from 'react';

const useFetch = () => {
  const [fetchError, setFetchError] = useState(null);

  const server = "localhost";
  const port = "5001";

  const fetchData = async ({ endpoint = "/home", method = "GET", authorization = null, body = {} }) => {
    setFetchError(null);

    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (authorization) {
        headers["Authorization"] = authorization;
      }

      const fetchOptions = {
        method,
        headers,
      };

      if (method !== "GET") {
        fetchOptions.body = JSON.stringify(body);
      }

      const response = await fetch(`http://${server}:${port}/dmusic${endpoint}`, fetchOptions);

      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setFetchError(err.message);
      throw err;
    }
  };

  return { fetchError, fetchData };
};

export default useFetch;
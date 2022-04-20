import { useEffect, useState } from "react";


function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setError(null);
        setIsPending(false);
      })
      .catch((error) => {
        setError(error);
        setIsPending(false);
        setData(null);
      });
  }, [url]);
  
  return { data, error, isPending };
}

export default useFetch;
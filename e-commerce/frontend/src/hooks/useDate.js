import React, { useEffect, useState } from "react";
import apiClient from "../api.Client";

function useDate(endPoint, customConfig, deps) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      const getCategory = async () => {
        try {
          setIsLoading(true);
          const res = await apiClient.get(endPoint, customConfig);
          if (
            endPoint === "/products" &&
            data &&
            data.products &&
            customConfig.params.page !== 1
          ) {
            setData((prev) => {
              return {
                ...prev,
                products: [...prev.products, ...res.data.products],
              };
            });
          } else {
            setData(res.data);
          }
          setIsLoading(false);
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        }
      };
      getCategory();
    },
    deps ? deps : []
  );
  return { data, error, isLoading };
}

export default useDate;

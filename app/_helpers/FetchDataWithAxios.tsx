"use client";
import { useEffect, useState } from "react";
import { instance } from "./axios";

export default function useFetchData(api: string, paginationState: boolean) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    async function fetchData(page: number) {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const response = await instance.get(`${api}?page=${page}`);
        if (response.status === 200) {
          setData(response.data.data);
          if (paginationState && response.data.pagination) {
            const pagination = response.data.pagination;
            setCurrentPage(pagination.current_page);
            setLastPage(pagination.last_page);
          }
        }
      } catch (err) {
        if (err) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData(currentPage);
  }, [api, paginationState, currentPage]);

  return {
    data,
    setData,
    currentPage,
    setCurrentPage,
    lastPage,
    loading,
    error,
  };
}

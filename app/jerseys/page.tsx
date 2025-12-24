"use client";
import { Jersey } from "@/types/jersey";
import { useEffect, useState } from "react";
import JerseysContainer from "./components/JerseysContainer";
import { useQuery } from "@tanstack/react-query";

const limit = 8;

const JerseysPage = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("default");

   /* Debounce search */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);  // reset page on new search
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const {data, isLoading} = useQuery({
    queryKey: ["jerseys", debouncedSearch, sort, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page), 
        limit: String(limit),
        search: debouncedSearch, 
        sort,
      });

      const res = await fetch(`/api/jerseys?${params}`);
      if (!res.ok) throw new Error("Failed to fetch jerseys");

      return res.json();
    },
    enabled: debouncedSearch === search,
  })

  const jerseys: Jersey[] = data?.data || [];
  const totalPage: number = data?.pagination?.totalPages || 1;

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };
  
  return (
    <div className="min-h-screen">
      <h1 className="text-center text-3xl font-semibold mb-3 mt-12">Jerseys</h1>
      <p className="text-gray-600 text-center mb-8">Whether on the field or in the stands, wear your colors loud with our top-rated jerseys.</p>
      <JerseysContainer
        jerseys={jerseys}
        search={search}
        setSearch={setSearch}
        sort={sort}
        handleSortChange={handleSortChange}
        page={page}
        setPage={setPage}
        totalPage={totalPage}
        loading={isLoading} 
      />
    </div>
  );
};

export default JerseysPage;

"use client";
import { Jersey } from "@/types/jersey";
import { useEffect, useState } from "react";
import JerseysContainer from "./components/JerseysContainer";

const JerseysPage = () => {
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sort, setSort] = useState("default");
  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        search,
        sort,
      });

      const res = await fetch(`/api/jerseys?${params}`);
      const jerseyData = await res.json();

      setJerseys(jerseyData.data || []);
      setTotalPage(jerseyData.pagination?.totalPages || 1);
    };
    fetchData();
  }, [sort, search, page]);

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };
  return (
    <div className="min-h-screen">
      <JerseysContainer
        jerseys={jerseys}
        search={search}
        setSearch={setSearch}
        sort={sort}
        handleSortChange={handleSortChange}
        page={page}
        setPage={setPage}
        totalPage={totalPage}
      />
    </div>
  );
};

export default JerseysPage;

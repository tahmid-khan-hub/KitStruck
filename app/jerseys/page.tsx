"use client";
import { Jersey } from "@/types/jersey";
import { useEffect, useState } from "react";
import JerseysContainer from "./components/JerseysContainer";

const JerseysPage = () => {
  const [loading, setLoading] = useState(true);
  const [jerseys, setJerseys] = useState<Jersey[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [sort, setSort] = useState("default");
  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // start loading
      try {
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
      } catch (err) {
        console.error("Fetch error:", err);
        setJerseys([]);
        setTotalPage(1);
      } finally {
        setLoading(false); // stop loading
      }
    };
    fetchData();
  }, [sort, search, page]);

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
        loading={loading} 
      />
    </div>
  );
};

export default JerseysPage;

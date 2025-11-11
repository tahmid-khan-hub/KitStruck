"use client";

import { Jersey } from "@/types/jersey";

interface JerseysContainerProps {
  jerseys: Jersey[];
  search: string;
  setSearch: (value: string) => void;
  sort: string;
  handleSortChange: (value: string) => void;
  page: number;
  setPage: (value: number) => void;
  totalPage: number;
}
const JerseysContainer = ({jerseys, search, setSearch, sort,handleSortChange, page, setPage, totalPage
}: JerseysContainerProps) => {
  return <div></div>;
};

export default JerseysContainer;

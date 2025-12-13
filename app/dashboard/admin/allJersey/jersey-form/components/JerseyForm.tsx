"use client";

import { Jersey } from "@/types/jersey";
import JerseyFormFields from "./JerseyFormFields";
import { useState } from "react";

export default function JerseyForm({ jerseyData }: { jerseyData: Jersey }) {
  const [category, setCategory] = useState("");
  return (
    <div className="px-20">
      <form className="space-y-4">
        <JerseyFormFields jerseyData={jerseyData} category={category} setCategory={setCategory} />
        <button className="w-full btns mt-7">Update</button>
      </form>
    </div>
  );
}

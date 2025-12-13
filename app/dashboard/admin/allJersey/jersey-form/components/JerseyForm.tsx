"use client";

import { Jersey } from "@/types/jersey";
import JerseyFormFields from "./JerseyFormFields";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { jerseyPayload } from "@/types/jerseyPayload";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";

export default function JerseyForm({ jerseyData }: { jerseyData: Jersey }) {
  const { successToast, errorToast } = UseSweetAlert();
  const [category, setCategory] = useState("");

  const {mutate, isPending} = useMutation({
    mutationFn: async(payload: jerseyPayload) => {
        const res = await fetch("/api/admin/allJersey/jersey-form", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update jersey");
      return res.json();
    },
    onSuccess: () => {
      successToast("Jersey data updated successfully");
    },

    onError: () => {
      errorToast("Failed to update jersey data");
    },
  })

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload: jerseyPayload = {
        jersey_id: jerseyData.jersey_id,
        name: formData.get("name") as string,
        team: formData.get("team") as string,
        price: Number(formData.get("price")),
        description: formData.get("description") as string,
        image_url: formData.get("image_url") as string,
        stock: Number(formData.get("stock")),
        offer: formData.get("offer")
        ? Number(formData.get("offer"))
        : null,
        category,
    };

    mutate(payload);
    successToast("")
  }
  return (
    <div className="px-20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <JerseyFormFields jerseyData={jerseyData} category={category} setCategory={setCategory} />
        <button disabled={isPending} className="w-full btns my-7">{isPending ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
}

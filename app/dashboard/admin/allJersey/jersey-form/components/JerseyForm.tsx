"use client";

import { Jersey } from "@/types/jersey";
import JerseyFormFields from "./JerseyFormFields";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { jerseyPayload } from "@/types/jerseyPayload";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import useAxiosSecure from "@/app/hooks/useAxiosSecure";

export default function JerseyForm({ jerseyData }: { jerseyData: Jersey }) {
  const { successToast, errorToast } = UseSweetAlert();
  const [category, setCategory] = useState("");
  const axiosSecure = useAxiosSecure();

  const {mutate, isPending} = useMutation({
    mutationFn: async(payload: jerseyPayload) => {
        const res = await axiosSecure.patch("/api/admin/allJersey/jersey-form", payload);
        return res.data;
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

    const nativeEvent = e.nativeEvent as SubmitEvent;
    const submitter = nativeEvent.submitter as HTMLButtonElement | null;

    if (!submitter || submitter.name !== "submitBtn") return;

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
  }
  return (
    <div className="px-16">
      <form onSubmit={handleSubmit} className="space-y-4">
        <JerseyFormFields jerseyData={jerseyData} category={category} setCategory={setCategory} />
        <button type="submit" name="submitBtn" value="update" disabled={isPending} className="w-full btns my-7">{isPending ? "Updating..." : "Update"}</button>
      </form>
    </div>
  );
}

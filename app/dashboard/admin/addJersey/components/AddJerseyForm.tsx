"use client";

import { FormEvent, useState } from "react";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import FormFields from "./FormFields";

const AddJerseyForm = () => {

  const { successToast, errorToast } = UseSweetAlert();
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formdata = new FormData(form);
    const jerseyData = {
      name: formdata.get("name"),
      team: formdata.get("team"),
      category: category,
      price: formdata.get("price"),
      image_url: formdata.get("image_url"),
      description: formdata.get("description"),
      stock: formdata.get("stock"),
    };

    const res = await fetch("/api/admin/add-jersey", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jerseyData }),
    });

    if (res.ok) {
      successToast("New Jersey has been added successfully!");
      form.reset();
      setCategory("");
    } else {
      errorToast("Failed to add new jersey. Something went wrong!");
    }
  };
  return (
    <div className="px-20">
      <form onSubmit={handleSubmit} className="space-y-4">
          <FormFields category={category} setCategory={setCategory} />
        <button className="w-full btns mt-7">Add Jersey</button>
      </form>
    </div>
  );
};

export default AddJerseyForm;

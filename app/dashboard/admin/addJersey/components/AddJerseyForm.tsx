"use client";

import { FormEvent, useState } from "react";
import UseSweetAlert from "@/app/hooks/UseSweetAlert";
import FormFields from "./FormFields";
import { motion } from "framer-motion";

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
      <motion.form initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} 
        onSubmit={handleSubmit} className="space-y-4">
          <FormFields category={category} setCategory={setCategory} />
        <button className="w-full btns my-7">Add Jersey</button>
      </motion.form>
    </div>
  );
};

export default AddJerseyForm;

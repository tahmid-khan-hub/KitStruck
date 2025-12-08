"use client";

import CategoryDrawer from "./CategoryDrawer";

const AddJerseyForm = () => {
  return (
    <div className="px-20">
      <form className="space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Jersey Name"
            className="border p-3 rounded-md w-full"
          />
          <input
            name="team"
            placeholder="Team Name"
            className="border p-3 rounded-md w-full"
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CategoryDrawer value={formData.category} onChange={changeCategory} />
          <input
            name="price"
            placeholder="Price"
            className="border p-3 rounded-md w-full"
          />
        </div>

        {/* Row 3 */}
        <textarea
          name="description"
          placeholder="Description"
          rows={5}
          className="border p-3 rounded-md w-full"
        />

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="image_url"
            placeholder="Image URL"
            className="border p-3 rounded-md w-full"
          />
          <input
            name="stock"
            placeholder="Stock"
            className="border p-3 rounded-md w-full"
          />
        </div>

        <button className="w-full btns">
          Add Jersey
        </button>
      </form>
    </div>
  );
};

export default AddJerseyForm;

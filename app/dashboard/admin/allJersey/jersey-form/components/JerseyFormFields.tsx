import CategoryDrawer from "@/app/dashboard/components/CategoryDrawer/CategoryDrawer";
import { Jersey } from "@/types/jersey";

export default function JerseyFormFields({ category, setCategory, jerseyData }: { category: string; setCategory: (value: string) => void; jerseyData: Jersey; }) {
  return (
    <>
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Jersey Name"
          defaultValue={jerseyData.name}
          className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 p-3 w-full mb-5"
          required
        />
        <input
          name="team"
          placeholder="Team Name"
          className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 p-3 w-full mb-5"
          required
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CategoryDrawer value={category} onChange={setCategory} />

        <input
          name="price"
          placeholder="Price"
          className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 p-3 w-full mb-5"
          required
        />
      </div>

      {/* Row 3 */}
      <textarea
        name="description"
        placeholder="Description"
        rows={5}
        className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 p-3 w-full mb-5"
        required
      />

      {/* Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="image_url"
          placeholder="Image URL"
          className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 p-3 w-full mb-5"
          required
        />
        <input
          name="stock"
          placeholder="Stock"
          className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 p-3 w-full mb-5"
          required
        />
      </div>
    </>
  );
}

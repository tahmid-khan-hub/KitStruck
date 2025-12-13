import CategoryDrawer from "@/app/dashboard/components/CategoryDrawer/CategoryDrawer";
import { Jersey } from "@/types/jersey";

export default function JerseyFormFields({ category, setCategory, jerseyData }: { category: string; setCategory: (value: string) => void; jerseyData: Jersey;
}) {
  return (
    <>
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Jersey Name
          </label>
          <input
            name="name"
            placeholder="Jersey Name"
            defaultValue={jerseyData.name}
            className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 p-3 w-full mb-5"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Team Name
          </label>
          <input
            name="team"
            placeholder="Team Name"
            defaultValue={jerseyData.team}
            className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 p-3 w-full mb-5"
            required
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Category
          </label>
          <CategoryDrawer value={category} onChange={setCategory} />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            name="price"
            placeholder="Price"
            defaultValue={jerseyData.price}
            className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 p-3 w-full mb-5"
            required
          />
        </div>
      </div>

      {/* Row 3 */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Description"
          rows={5}
          defaultValue={jerseyData.description}
          className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 p-3 w-full mb-5"
          required
        />
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            name="image_url"
            placeholder="Image URL"
            defaultValue={jerseyData.image_url}
            className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 p-3 w-full mb-5"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            name="stock"
            placeholder="Stock"
            defaultValue={jerseyData.stock}
            className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 p-3 w-full mb-5"
            required
          />
        </div>
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Offer (%)
          </label>
          <input
            name="offer"
            placeholder="Put offer if any (only number)"
            defaultValue={jerseyData.offer}
            className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-800 p-3 w-full mb-5"
          />
        </div>
      </div>
    </>
  );
}

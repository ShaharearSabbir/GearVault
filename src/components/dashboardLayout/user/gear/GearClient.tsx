/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  Loader2,
  X,
  Image as ImageIcon,
} from "lucide-react";

import Image from "next/image";
import gearDefaultImage from "@/assets/gear.jpg";
import { createGear, deleteGear } from "@/actions/gear.action";

export default function GearClient({ initialGears, categories }: any) {
  const [gears, setGears] = useState(JSON.parse(initialGears));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [images, setImages] = useState<string[]>([]);
  const [specs, setSpecs] = useState([{ key: "", value: "" }]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(gears.length / itemsPerPage);
  const currentData = gears.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handle Image Upload to ImgBB
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await res.json();
      setImages((prev) => [...prev, data.data.url]);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const addSpecField = () => setSpecs([...specs, { key: "", value: "" }]);

  const handleSpecChange = (
    index: number,
    field: "key" | "value",
    val: string,
  ) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = val;
    setSpecs(newSpecs);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> Add Gear
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Item
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Category
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Daily Rate
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentData.map((gear: any) => (
              <tr
                key={gear.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      width={40}
                      height={40}
                      alt=""
                      src={gear.images[0] || gearDefaultImage}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">
                        {gear.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {gear.brand} {gear.modelNumber}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {gear.category.name}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">
                  ${gear.dailyRate.toString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      gear.status === "AVAILABLE"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {gear.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-slate-400 hover:text-slate-900">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => deleteGear(gear.id)}
                    className="text-slate-400 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center px-2">
        <p className="text-sm text-slate-500">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 border rounded hover:bg-slate-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Add Gear Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Register New Gear</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X />
              </button>
            </div>

            <form
              action={async (formData) => {
                formData.append("images", JSON.stringify(images));
                formData.append("specifications", JSON.stringify(specs));
                const result = await createGear(formData);
                if (result.success) setIsModalOpen(false);
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Info */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Gear Name
                  </label>
                  <input
                    name="name"
                    placeholder="e.g. Sony A7 IV"
                    className="border p-3 rounded-xl w-full"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Brand
                  </label>
                  <input
                    name="brand"
                    placeholder="e.g. Sony"
                    className="border p-3 rounded-xl w-full"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Model Number (Optional)
                  </label>
                  <input
                    name="modelNumber"
                    placeholder="e.g. ILCE-7M4"
                    className="border p-3 rounded-xl w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Serial Number
                  </label>
                  <input
                    name="serialNumber"
                    placeholder="Unique Serial ID"
                    className="border p-3 rounded-xl w-full"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Daily Rate ($)
                  </label>
                  <input
                    name="dailyRate"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="border p-3 rounded-xl w-full"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Category
                  </label>
                  <select
                    name="categoryId"
                    className="border p-3 rounded-xl w-full"
                  >
                    {categories.map((c: any) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Current Status
                  </label>
                  <select
                    name="status"
                    className="border p-3 rounded-xl w-full"
                  >
                    <option value="AVAILABLE">Available</option>
                    <option value="IN_USE">In Use</option>
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="RETIRED">Retired</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Condition
                  </label>
                  <select
                    name="condition"
                    className="border p-3 rounded-xl w-full"
                  >
                    <option value="NEW">New</option>
                    <option value="EXCELLENT">Excellent</option>
                    <option value="GOOD">Good</option>
                    <option value="FAIR">Fair</option>
                    <option value="POOR">Poor</option>
                  </select>
                </div>
              </div>

              {/* Description - Full Width */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  placeholder="Add any specific details or notes about this item..."
                  className="border p-3 rounded-xl w-full h-24 resize-none"
                />
              </div>

              {/* Specification Builder */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 uppercase">
                  Specifications
                </label>
                {specs.map((spec, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      placeholder="e.g. Weight"
                      className="border p-2 rounded-lg flex-1"
                      onChange={(e) =>
                        handleSpecChange(idx, "key", e.target.value)
                      }
                    />
                    <input
                      placeholder="e.g. 2kg"
                      className="border p-2 rounded-lg flex-1"
                      onChange={(e) =>
                        handleSpecChange(idx, "value", e.target.value)
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSpecField}
                  className="text-sm text-blue-600 font-medium"
                >
                  + Add Field
                </button>
              </div>

              {/* Image Uploader */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-500 uppercase">
                  Gallery
                </label>
                <div className="flex flex-wrap gap-3">
                  {images.map((url, i) => (
                    <div
                      key={i}
                      className="relative w-20 h-20 border rounded-lg overflow-hidden"
                    >
                      <Image
                        src={url}
                        height={20}
                        width={20}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                  <label className="w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition">
                    {uploading ? (
                      <Loader2 className="animate-spin text-slate-400" />
                    ) : (
                      <>
                        <ImageIcon className="text-slate-400" size={20} />
                        <span className="text-[10px] mt-1">Upload</span>
                      </>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition"
              >
                Add to Vault
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

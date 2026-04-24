"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { addCategory, deleteCategory } from "@/actions/category.action";

interface Category {
  id: string;
  name: string;
  _count?: { gears: number };
}

export default function CategoryClient({
  initialData,
}: {
  initialData: Category[];
}) {
  const [categories, setCategories] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleDelete = async (id: string) => {
    if (
      confirm("Are you sure? This may affect gear linked to this category.")
    ) {
      await deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Category Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                Items Linked
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-slate-900">
                  {cat.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">
                  {cat._count?.gears || 0} gear items
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingCategory(cat);
                        setIsModalOpen(true);
                      }}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simple Modal Logic (Simplified for brevity) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-slate-200">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? "Edit Category" : "New Category"}
            </h2>
            <form
              action={async (formData) => {
                const name = formData.get("name");

                console.log(name);

                const result = await addCategory(name as string);

                if (result.success) {
                  setCategories([...categories, result.data!]);
                  setIsModalOpen(false);
                }

                console.log(result);
              }}
            >
              <input
                name="name"
                defaultValue={editingCategory?.name}
                placeholder="Category Name (e.g. Cinema Cameras)"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { getCategories } from "@/actions/category.action";
import CategoryClient from "@/components/dashboardLayout/admin/categories/CategoryClient";
import { Category } from "@/generated/prisma/client";

export default async function CategoryPage() {
  const categoriesData = await getCategories();

  let categories: Category[] = [];

  if (categoriesData.success) {
    categories = categoriesData.data as Category[];
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Categories
          </h1>
          <p className="text-sm text-slate-500">
            Manage gear classifications and organization.
          </p>
        </div>
      </div>

      {/* Pass data to the Client Component */}
      <CategoryClient initialData={categories} />
    </div>
  );
}

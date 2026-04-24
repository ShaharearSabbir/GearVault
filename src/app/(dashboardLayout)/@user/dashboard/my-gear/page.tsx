import { getCategories } from "@/actions/category.action";
import { getMyGears } from "@/actions/gear.action";
import GearClient from "@/components/dashboardLayout/user/gear/GearClient";

export default async function MyGearPage() {
  const gears = await getMyGears();
  const categories = (await getCategories()).data;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Gear Vault</h1>
          <p className="text-sm text-slate-500">
            Manage and track your equipment inventory.
          </p>
        </div>
      </div>

      <GearClient initialGears={JSON.stringify(gears)} categories={categories} />
    </div>
  );
}

import { getUser } from "@/actions/auth.action";
import SidebarLink from "./SidebarLink";
import { Role } from "@/generated/prisma/enums";
import { sidebarLinks } from "@/config/sidebarConfig";

export default async function Sidebar() {
  const userData = await getUser();
  const user = userData?.user;
  const role = (user?.role as Role) || Role.USER;

  const links = sidebarLinks[role];

  return (
    <div className="flex flex-col h-full p-6 bg-white border-r border-slate-200">
      {/* Brand */}
      <div className="flex items-center gap-3 px-3 mb-10">
        <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xs">GV</span>
        </div>
        <div className="font-bold text-xl tracking-tight text-slate-900 italic">
          GearVault
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">
          {role === Role.ADMIN ? "System Administrator" : "Main Menu"}
        </div>

        <div className="space-y-1">
          {links.map((item) => (
            <SidebarLink
              key={item.id}
              title={item.title}
              link={item.link}
              iconName={item.iconName}
            />
          ))}
        </div>
      </nav>

      {/* Footer Support Card */}
      <div className="mt-auto pt-6">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <p className="text-xs font-bold text-slate-900 uppercase">
            Vault Secure
          </p>
          <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
            You are browsing as{" "}
            <span className="font-semibold text-slate-700">{user?.name}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

import { Mail, X } from "lucide-react";
import Link from "next/link";
import { BsGithub, BsInstagram } from "react-icons/bs";


export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white">G</div>
              <span className="text-xl font-bold text-white">GearVault</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              The industry standard for equipment management. Built for production houses, 
              freelancers, and rental shops who demand precision and reliability.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-slate-500 hover:text-blue-500 transition"><X size={18} /></Link>
              <Link href="#" className="text-slate-500 hover:text-blue-500 transition"><BsInstagram size={18} /></Link>
              <Link href="#" className="text-slate-500 hover:text-blue-500 transition"><BsGithub size={18} /></Link>
            </div>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link href="/dashboard" className="hover:text-blue-400 transition">Inventory Dashboard</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Serial Tracking</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Maintenance Logs</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Team Collaboration</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-blue-400 transition">Help Center</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">API Documentation</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Community Forum</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-bold">Stay Updated</h4>
            <p className="text-slate-500 text-sm">Get the latest feature updates and inventory tips.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
              <button className="absolute right-2 top-2 p-1.5 bg-blue-600 rounded-lg text-white hover:bg-blue-500 transition">
                <Mail size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} GearVault Systems Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-600">
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition">Cookie Policy</Link>
            <Link href="#" className="hover:text-white transition">Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
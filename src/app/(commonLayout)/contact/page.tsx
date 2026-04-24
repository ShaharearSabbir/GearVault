import { Mail, MessageSquare, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header Section */}
      <div className="bg-slate-950 pt-32 pb-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter mb-6 italic">
            Get in <span className="text-blue-500 text-not-italic">Touch.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">
            Have questions about inventory management or custom enterprise
            solutions? Our technical team is ready to assist you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- LEFT: Contact Information (5/12) --- */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-sm h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-900 mb-8">
                  Direct Channels
                </h3>
                <div className="space-y-8">
                  <ContactMethod
                    icon={<Mail className="text-blue-600" />}
                    label="Email us at"
                    value="support@gearvault.com"
                  />
                  <ContactMethod
                    icon={<MessageSquare className="text-blue-600" />}
                    label="Live Chat"
                    value="Available Mon-Fri, 9am - 6pm"
                  />
                  <ContactMethod
                    icon={<MapPin className="text-blue-600" />}
                    label="Headquarters"
                    value="Dhaka, Bangladesh"
                  />
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                  Social Presence
                </p>
                <div className="flex gap-4">
                  {["Twitter", "LinkedIn", "Instagram"].map((platform) => (
                    <span
                      key={platform}
                      className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:text-blue-600 cursor-pointer transition"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Contact Form (7/12) --- */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 border border-slate-200 shadow-xl shadow-slate-200/50">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase ml-1">
                    Subject
                  </label>
                  <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 appearance-none">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Enterprise Pricing</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase ml-1">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-blue-600/20"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ContactMethod({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-6 group">
      <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-lg font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (

    <main className="min-h-screen flex flex-col justify-center items-center bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-zinc-100 via-zinc-50 to-white px-4">
      <div className="w-full max-w-md flex flex-col gap-2 mb-2">

        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center shadow-lg shadow-zinc-900/20">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            GearVault
          </h1>
        </div>
      </div>

      <RegisterForm />

      {/* Optional: Footer or helper links for the page level */}
      <div className="mt-8 text-zinc-400 text-xs uppercase tracking-widest font-medium">
        Secure Encryption Enabled
      </div>
    </main>
  );
}

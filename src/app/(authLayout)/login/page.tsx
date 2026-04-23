import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            GearVault
          </h1>
          <p className="text-sm text-slate-500">
            Enter your credentials to access the vault
          </p>
        </div>

        {/* The Client Component handles the actual form */}
        <LoginForm />

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

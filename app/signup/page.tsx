import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 text-slate-50 px-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your VIA Hub account
        </h1>
        <p className="text-slate-400 text-sm mt-1">Your way to learning.</p>
      </div>

      <AuthForm mode="signup" />

      <p className="text-sm text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="text-slate-50 underline underline-offset-2">
          Log in
        </Link>
      </p>
    </main>
  );
}

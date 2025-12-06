import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { RegisterForm } from "@/components/RegisterForm";

export default async function RegisterPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  if (token) {
    redirect("/dashboard");
  }

  return (
    <div className="px-4 pt-4 pb-5 sm:px-8 sm:pt-9 sm:pb-7">
      <div className="mx-auto flex w-full max-w-94 sm:max-w-md flex-col">
        <h2 className="text-xl font-medium text-center border-b-2 border-zinc-600">Register</h2>
        <RegisterForm />
        <Link
          href="/"
          className="px-3 py-1 bg-zinc-700 text-gray-50 border border-zinc-700 rounded-md text-center hover:bg-transparent hover:text-zinc-700"
        >
          Go to Top Page{" "}
        </Link>
      </div>
    </div>
  );
}

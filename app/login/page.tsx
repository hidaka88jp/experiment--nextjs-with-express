import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LoginForm from "@/components/LoginForm";

export default async function loginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");
  if (token) redirect("/dashboard");

  return (
    <div className="px-4 pt-4 pb-5 sm:px-8 sm:pt-9 sm:pb-7">
      <div className="mx-auto flex w-full max-w-94 sm:max-w-md flex-col">
        <h2 className="text-xl font-medium text-center border-b-2 border-zinc-600">Login page</h2>
        <LoginForm />
      </div>
    </div>
  );
}

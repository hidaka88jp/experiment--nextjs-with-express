import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LoginForm from "@/components/LoginForm";

export default async function loginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");
  if (token) redirect("/dashboard");

  return (
    <>
      <p>login page</p>
      <LoginForm />
    </>
  );
}

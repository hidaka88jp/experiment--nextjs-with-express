import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/RegisterForm";

export default async function RegisterPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  if (token) {
    redirect("/dashboard");
  }

  return (
    <>
      <p>Register</p>
      <RegisterForm />
    </>
  );
}

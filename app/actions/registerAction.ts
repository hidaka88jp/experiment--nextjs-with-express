"use server";

import { redirect } from "next/navigation";

type RegisterState = {
  error?: string;
};

export async function registerAction(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const name = formData.get("name");
  const password = formData.get("password");

  const res = await fetch(process.env.INTERNAL_REGISTER_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  });

  if (!res.ok) {
    let errorMessage = "Fail to register";

    try {
      const data = await res.json();
      if (data.error) {
        errorMessage = data.error;
      }
    } catch {
      // Ignore JSON parsing errors
    }

    return { error: errorMessage };
  }

  // if registration is successful, redirect to login page
  redirect("/login");
}

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

  // Basic validation
  if (typeof name !== "string" || typeof password !== "string") {
    return { error: "Invalid form data" };
  }

  if (name.trim().length < 3) {
    return { error: "Name must be at least 3 characters" };
  }
  if (password.trim().length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

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

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LoginState = {
  error?: string;
};

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const name = formData.get("name");
  const password = formData.get("password");

  // Basic validation
  if (typeof name !== "string" || typeof password !== "string") {
    return { error: "Invalid form data" };
  }

  const res = await fetch(process.env.INTERNAL_LOGIN_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  });

  // When login fails
  if (!res.ok) {
    let message = "Login failed";

    try {
      const data = await res.json();
      if (data.error) {
        message = data.error;
      }
    } catch {
      // Ignore JSON parsing errors
    }

    return { error: message };
  }

  const data = await res.json();
  const token = data.session_token;

  // Set cookie
  (await cookies()).set("session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  // Redirect to home page after successful login
  redirect("/");
}

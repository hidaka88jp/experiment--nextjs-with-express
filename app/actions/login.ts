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

  const res = await fetch(process.env.INTERNAL_LOGIN_URL!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  });

  if (!res.ok) {
    return { error: "ログインに失敗しました" };
  }

  const user = await res.json();

  // Cookie セット（必要なら）
  const cookieStore = await cookies();
  cookieStore.set("userId", user.id, {
    httpOnly: true,
    secure: true,
  });

  redirect("/dashboard");
}

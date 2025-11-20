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

  // Express 側から session_token を受け取る
  const data = await res.json();
  const token = data.session_token;

  // Cookie に session_token を保存
  const cookieStore = await cookies();
  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  redirect("/dashboard");
}

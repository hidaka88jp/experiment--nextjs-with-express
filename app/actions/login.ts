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

  // 🔥 バックエンドのメッセージを拾う
  if (!res.ok) {
    let message = "Login failed";

    try {
      const data = await res.json();
      if (data.error) {
        message = data.error;
      }
    } catch {
      // JSON がパースできなかった時だけ無視
    }

    return { error: message };
  }

  const data = await res.json();
  const token = data.session_token;

  // Cookie 保存
  (await cookies()).set("session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  // 🔥 成功時は redirect（state は返さず中断して遷移）
  redirect("/");
}

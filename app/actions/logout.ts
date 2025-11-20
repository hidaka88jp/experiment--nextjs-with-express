"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token"); // 👈 Cookie 削除

  redirect("/login"); // 👈 ログインページへ戻す
}
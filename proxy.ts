import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const user = req.cookies.get("user");

  // 例： /dashboard を保護する
  if (pathname.startsWith("/dashboard") && !user) {
    console.log("[proxy] redirect → /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
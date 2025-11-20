"use client";

import { logoutAction } from "@/app/actions/logout";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit">
        Logout
      </button>
    </form>
  );
}

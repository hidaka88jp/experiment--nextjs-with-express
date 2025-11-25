"use client";

import { logoutAction } from "@/app/actions/logout";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <button type="submit" className="px-3 py-1 bg-rose-700 text-gray-50 border border-rose-700 rounded-md text-center hover:bg-transparent hover:text-rose-700 mb-5 w-full cursor-pointer">
        Logout
      </button>
    </form>
  );
}

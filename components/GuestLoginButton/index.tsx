"use client";

import { guestLoginAction } from "@/app/actions/guestLogin";

export function GuestLoginButton() {
  return (
    <form action={guestLoginAction} className="w-full">
      <button type="submit" className="px-3 py-1 bg-teal-700 text-gray-50 border border-teal-700 rounded-md text-center hover:bg-transparent hover:text-teal-700 w-full">
        Try as Guest
      </button>
    </form>
  );
}

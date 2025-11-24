"use client";

import { guestLoginAction } from "@/app/actions/guestLogin";

export function GuestLoginButton() {
  return (
    <form action={guestLoginAction}>
      <button type="submit" className="text-blue-600 underline">
        Try as Guest
      </button>
    </form>
  );
}

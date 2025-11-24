"use client";

import { useActionState } from "react";
import { registerAction } from "@/app/actions/registerAction";

export default function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, {});

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input
        name="name"
        placeholder="Name"
        required
        className="border p-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="border p-2"
      />

      {state.error && <p className="text-red-600">{state.error}</p>}

      <button type="submit" className="bg-blue-500 text-white p-2">
        Register
      </button>
    </form>
  );
}

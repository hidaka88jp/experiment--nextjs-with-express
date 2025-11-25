"use client";

import { useActionState } from "react";
import { registerAction } from "@/app/actions/registerAction";

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, {});

  return (
    <form action={formAction} className="my-8">
      <input
        name="name"
        placeholder="Name"
        required
        className="w-full border border-gray-400 px-2 py-1 rounded-md mb-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full border border-gray-400 px-2 py-1 rounded-md mb-2"
      />

      {state.error && <p className="text-red-600">{state.error}</p>}

      <button type="submit" className="px-3 py-1 bg-sky-700 text-gray-50 border border-sky-700 rounded-md text-center hover:bg-transparent hover:text-sky-700 mb-5 w-full">
        Register
      </button>
    </form>
  );
}

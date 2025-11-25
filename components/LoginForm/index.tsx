"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/login";

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, {});

  return (
    <form action={formAction} className="my-8">
      <input name="name" type="text" className="w-full border border-gray-400 px-2 py-1 rounded-md mb-2" /><br/>
      <input name="password" type="password" className="w-full border border-gray-400 px-2 py-1 rounded-md mb-4" /><br/>
      <button type="submit" className="px-3 py-1 bg-sky-700 text-gray-50 border border-sky-700 rounded-md text-center hover:bg-transparent hover:text-sky-700 mb-5 w-full">Login</button>

      {state?.error && <p>{state.error}</p>}
    </form>
  );
}

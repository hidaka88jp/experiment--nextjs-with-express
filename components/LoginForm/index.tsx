"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/login";

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, {});

  return (
    <form action={formAction}>
      <input name="name" type="text" className="mb-3" /><br/>
      <input name="password" type="password" className="mb-3" /><br/>
      <button type="submit">Login</button>

      {state?.error && <p>{state.error}</p>}
    </form>
  );
}

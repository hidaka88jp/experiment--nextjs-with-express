"use client";

import { useFormState } from "react-dom";
import { loginAction } from "@/app/actions/login";

export default function LoginPage() {
  const [state, formAction] = useFormState(loginAction, {});

  return (
    <form action={formAction}>
      <input name="name" type="text" className="mb-3" /><br/>
      <input name="password" type="password" className="mb-3" /><br/>
      <button type="submit">Login</button>

      {state?.error && <p>{state.error}</p>}
    </form>
  );
}

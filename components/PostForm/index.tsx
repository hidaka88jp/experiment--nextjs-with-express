"use client";

import { useState } from "react";
import { postMessage } from "@/app/actions/postMessage";

export function PostForm() {
  const [error, setError] = useState("");

  async function handleAction(formData: FormData) {
    const res = await postMessage(formData);

    if (res.error) {
      setError(res.error);
    } else {
      setError("");
    }
  }

  return (
    <form action={handleAction}>
      <input name="message" type="text" placeholder="Write a message..." />
      <button type="submit">Post</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

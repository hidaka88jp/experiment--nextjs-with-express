"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { postMessage } from "@/app/actions/postMessage";

export function PostForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleAction(formData: FormData) {
    const res = await postMessage(formData);

    if (res?.error) {
      setError(res.error);
      return;
    }

    setError("");
    router.refresh(); // Refresh the page to show the new message
  }

  return (
    <form action={handleAction}>
      <input name="message" type="text" placeholder="Write a message..." />
      <button type="submit">Post</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

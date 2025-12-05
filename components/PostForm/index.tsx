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
    <>
      <form action={handleAction} className="flex items-center gap-1">
        <input name="message" type="text" placeholder="Write a message..." className="border border-zinc-800 rounded-md py-1 px-2 grow" />
        <button type="submit" className="border bg-teal-700 border-teal-700 text-gray-50 px-3 py-1 rounded-md hover:bg-gray-50 hover:text-teal-700 cursor-pointer">Post</button>

      </form>
      {error && <p className="text-red-400 text-sm mt-1 w-full">{error}</p>}
    </>
  );
}

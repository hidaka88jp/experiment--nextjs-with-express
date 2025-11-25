"use client";

import { useState } from "react";
import { updateMessageAction } from "@/app/actions/updateMessage";
import { useRouter } from "next/navigation";

export function EditForm({ id, initialMessage }: { id: number; initialMessage: string }) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(initialMessage);
  const router = useRouter();

  async function handleUpdate(formData: FormData) {
    await updateMessageAction(formData);
    router.refresh();  // ← Refresh the page to show updated message
    setOpen(false);    // ← Close the form after updating
  }

  return (
    <div>
      {!open && (
        <button onClick={() => setOpen(true)} className="px-2 py-1 bg-teal-700 text-gray-50 border border-teal-700 rounded-md text-center hover:bg-transparent hover:text-teal-700">Edit</button>
      )}

      {open && (
        <form action={handleUpdate}>
          <input type="hidden" name="id" value={id} />
          <input
            name="message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setOpen(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
}

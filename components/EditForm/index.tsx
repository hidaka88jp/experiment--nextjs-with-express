"use client";

import { useState } from "react";
import { updateMessageAction } from "@/app/actions/updateMessage";
import { useRouter } from "next/navigation";

export function EditForm({
  id,
  initialMessage,
}: {
  id: number;
  initialMessage: string;
}) {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(initialMessage);
  const router = useRouter();

  async function handleUpdate(formData: FormData) {
    await updateMessageAction(formData);
    router.refresh(); // ← Refresh the page to show updated message
    setOpen(false); // ← Close the form after updating
  }

  return (
    <div className="w-full">
      {!open && (
        <div className="flex justify-between items-center gap-2">
          <span>{initialMessage}</span>
          <button
            onClick={() => setOpen(true)}
            className="px-2 py-1 bg-teal-700 text-gray-50 border border-teal-700 rounded-md text-center hover:bg-transparent hover:text-teal-700"
          >
            Edit
          </button>
        </div>
      )}

      {open && (
        <form action={handleUpdate} className="flex justify-between items-center gap-2">
          <input type="hidden" name="id" value={id} />
          <input
            name="message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full border border-gray-400 px-2 py-1 rounded-md"
          />
          <div className="flex gap-2">
            <button type="submit" className="px-2 py-1 bg-sky-700 text-gray-50 border border-sky-700 rounded-md text-center hover:bg-transparent hover:text-sky-700">Save</button>
            <button type="button" onClick={() => setOpen(false)} className="px-2 py-1 bg-gray-700 text-gray-50 border border-gray-700 rounded-md text-center hover:bg-transparent hover:text-gray-700">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

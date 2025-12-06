"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DeleteMessageButtonProps = {
  id: number;
  action: (id: number) => Promise<{ error?: string; success?: boolean }>;
};

export function DeleteButton({ id, action }: DeleteMessageButtonProps) {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  async function handleDelete() {
    const result = await action(id);

    if (result.error) {
      setError(result.error);
      return;
    }

    // if deletion is successful, the page should be refreshed
    router.refresh();
  }

  return (
    <div>
      <button
        onClick={handleDelete}
        className="px-2 py-1 bg-rose-700 text-gray-50 border border-rose-700 rounded-md 
                   hover:bg-transparent hover:text-rose-700"
      >
        Delete
      </button>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

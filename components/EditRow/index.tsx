"use client";

import { useState } from "react";
import { EditForm } from "@/components/EditForm";
import { DeleteButton } from "@/components/DeleteButton";
import { deleteMessageAction } from "@/app/actions/deleteMessage";

export function EditRow({
  id,
  message,
}: {
  id: number;
  message: string;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="my-2 py-2 border-b">
      <div className="flex justify-between items-center gap-2">
        <EditForm
          id={id}
          initialMessage={message}
          onEditingChange={setIsEditing}
        />

        {!isEditing && (
          <DeleteButton id={id} action={deleteMessageAction} />
        )}
      </div>
    </li>
  );
}

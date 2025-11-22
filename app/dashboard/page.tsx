import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { LogoutButton } from "@/components/LogoutButton";
import { getUserBySession } from "@/app/lib/getUserBySession";
import { getUserMessages } from "@/app/lib/getUserMessages";
import { deleteMessageAction } from "@/app/actions/deleteMessage";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");
  if (!token) redirect("/login");

  const user = await getUserBySession();
  const messages = await getUserMessages();

  return (
    <div>
      <p>Welcome {user.name}</p>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id} className="my-2">
            {msg.message}

            {/* 削除フォーム */}
            <form
              action={async () => {
                "use server";
                await deleteMessageAction(msg.id);
              }}
              style={{ display: "inline" }}
            >
              <button type="submit" className="ml-4 text-red-600">
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
      <Link href="/">Go to Top Page </Link>
      <LogoutButton />
    </div>
  );
}

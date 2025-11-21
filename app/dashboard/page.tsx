import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { LogoutButton } from "@/components/LogoutButton";
import { getUserBySession } from "@/app/lib/getUserBySession";
import { getUserMessages } from "@/app/lib/getUserMessages";

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
          <li key={msg.id}>{msg.message}</li>
        ))}
      </ul>
      <Link href="/">Go to Top Page </Link>
      <LogoutButton />
    </div>
  );
}

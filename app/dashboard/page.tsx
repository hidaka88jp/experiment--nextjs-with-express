import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { LogoutButton } from "@/components/LogoutButton";
import { EditRow } from "@/components/EditRow";
import { getUserBySession } from "@/app/lib/getUserBySession";
import { getUserMessages } from "@/app/lib/getUserMessages";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");
  if (!token) redirect("/login");

  const user = await getUserBySession();
  const messages = await getUserMessages();

  return (
    <div className="px-4 pt-4 pb-5 sm:px-8 sm:pt-9 sm:pb-7">
      <div className="mx-auto flex w-full max-w-94 sm:max-w-md flex-col">
        <h2 className="text-xl font-medium text-center border-b-2 border-zinc-600">
          {user.name}&apos;s Dashboard
        </h2>
        <ul className="my-8">
          {messages.map((msg) => (
            <EditRow key={msg.id} id={msg.id} message={msg.message} />
          ))}
        </ul>
        <Link
          href="/"
          className="px-3 py-1 bg-zinc-700 text-gray-50 border border-zinc-700 rounded-md text-center hover:bg-transparent hover:text-zinc-700 mb-5"
        >
          Go to Top Page{" "}
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}

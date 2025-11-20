import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/LogoutButton";
import { getUserBySession } from "@/app/lib/getUserBySession";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");
  if (!token) redirect("/login");

  const user = await getUserBySession();

  return (
    <div>
      <p>Welcome {user.name}</p>
      <LogoutButton />
    </div>
  );
}

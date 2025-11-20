import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/LogoutButton";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");
  if (!userId) redirect("/login");

  return (
    <div>
      <p>Welcome to Dashboard</p>
      <LogoutButton />
    </div>
  );
}

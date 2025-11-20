import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/LogoutButton";
import { getUser } from "@/app/lib/getUser";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");
  if (!userId) redirect("/login");

  const user = await getUser(userId.value);

  return (
    <div>
      <p>Welcome {user.name}</p>
      <LogoutButton />
    </div>
  );
}

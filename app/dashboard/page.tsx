import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/components/LogoutButton";
// import { getUser } from "@/app/lib/getUser";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");
  if (!token) redirect("/login");

  // const user = await getUser(userId.value);

  return (
    <div>
      <p>Welcome</p>
      {/* <p>{user.name}</p> */}
      <LogoutButton />
    </div>
  );
}

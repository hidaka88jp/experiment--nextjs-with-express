import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");
  if (!userId) redirect("/login");

  return <div>Welcome to Dashboard</div>;
}

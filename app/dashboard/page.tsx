import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  if (!user) {
    redirect("/login");
  }
  
  return <div>Welcome {user.value}</div>;
}
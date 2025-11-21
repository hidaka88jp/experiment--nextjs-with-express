import Link from "next/link";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  const isLoggedIn = !!token;

  return (
    <>
      <p>Message Board</p>
      {isLoggedIn ? <PostForm /> : <Link href="/login">Login</Link>}
    </>
  );
}

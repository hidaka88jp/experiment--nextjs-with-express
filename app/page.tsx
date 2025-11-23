import Link from "next/link";
import { cookies } from "next/headers";
import { getAllMessages } from "@/app/lib/getAllMessages";

import { PostForm } from "@/components/PostForm";
import { LogoutButton } from "@/components/LogoutButton";


export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  const isLoggedIn = !!token;

  const messages = await getAllMessages();

  return (
    <>
      <p>Message Board</p>
      {isLoggedIn ? <PostForm /> : <Link href="/login">Login</Link>}
      <ul className="my-8">
        {messages.map((msg) => (
          <li key={msg.id}><b>{msg.user.name}:</b> {msg.message}</li>
        ))}
      </ul>
      {isLoggedIn && <Link href="/dashboard">Go to Dashboard</Link>}
      {isLoggedIn && <LogoutButton />}
    </>
  );
}

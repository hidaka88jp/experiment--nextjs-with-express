import Link from "next/link";
import { cookies } from "next/headers";
import { getAllMessages } from "@/app/lib/getAllMessages";

import { PostForm } from "@/components/PostForm";


export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  const isLoggedIn = !!token;

  const messages = await getAllMessages();

  return (
    <>
      <p>Message Board</p>
      {isLoggedIn ? <PostForm /> : <Link href="/login">Login</Link>}
      <ul className="mt-8">
        {messages.map((msg) => (
          <li key={msg.id}><b>{msg.user.name}:</b> {msg.message}</li>
        ))}
      </ul>
    </>
  );
}

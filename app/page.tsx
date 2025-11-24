import Link from "next/link";
import { cookies } from "next/headers";
import { getAllMessages } from "@/app/lib/getAllMessages";

import { PostForm } from "@/components/PostForm";
import { LogoutButton } from "@/components/LogoutButton";
import { GuestLoginButton } from "@/components/GuestLoginButton";
import { Header } from "@/components/Header";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  const isLoggedIn = !!token;

  const messages = await getAllMessages();

  return (
    <>
      <Header />
      {isLoggedIn ? (
        <PostForm />
      ) : (
        <>
          <Link href="/login">Login</Link>
          <GuestLoginButton />
        </>
      )}
      <ul className="my-8">
        {messages.map((msg) => (
          <li key={msg.id}>
            <b>{msg.user.name}:</b> {msg.message}
          </li>
        ))}
      </ul>
      {isLoggedIn && <Link href="/dashboard">Go to Dashboard</Link>}
      {isLoggedIn && <LogoutButton />}
    </>
  );
}

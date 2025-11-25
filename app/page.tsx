import Link from "next/link";
import { cookies } from "next/headers";
import { getAllMessages } from "@/app/lib/getAllMessages";

import { PostForm } from "@/components/PostForm";
import { LogoutButton } from "@/components/LogoutButton";
import { GuestLoginButton } from "@/components/GuestLoginButton";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");

  const isLoggedIn = !!token;

  const messages = await getAllMessages();

  return (
    <div className='px-4 pt-4 pb-5 sm:px-8 sm:pt-9 sm:pb-7'>
      <div className='mx-auto flex w-full max-w-94 sm:max-w-md flex-col'>
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
          <li key={msg.id} className="my-2 py-2 border-b border-zinc-500">
            <b>{msg.user.name}:</b> {msg.message}
          </li>
        ))}
      </ul>
      {isLoggedIn && <Link href="/dashboard" className="px-3 py-1 bg-zinc-700 text-gray-50 border border-zinc-700 rounded-md text-center hover:bg-transparent hover:text-zinc-700 mb-5">Go to Dashboard</Link>}
      {isLoggedIn && <LogoutButton />}
      </div>
    </div>
  );
}

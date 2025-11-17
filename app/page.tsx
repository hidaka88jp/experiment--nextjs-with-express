import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>my page</p>
      <Link href="/login">Login</Link>
    </>
  );
}

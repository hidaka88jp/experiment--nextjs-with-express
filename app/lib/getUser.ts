export async function getUser(userId: string) {
  const res = await fetch(`${process.env.INTERNAL_URL}/users/${userId}`, {
    // SSR のキャッシュを無効化して毎回最新を取る
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}
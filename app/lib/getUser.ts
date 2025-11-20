export async function getUser(userId: string) {
  const res = await fetch(`${process.env.INTERNAL_URL}/users/${userId}`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}
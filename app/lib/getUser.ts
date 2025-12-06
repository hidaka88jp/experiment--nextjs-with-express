// NOTE:
// This function is currently unused.
// User information on the client side is handled through session-based logic
// (getUserBySession), so fetching a user by ID is not necessary at the moment.
//
// The file is kept for possible future extensions,
// such as displaying another user's details or building admin tools.
//
// You may delete it if you prefer a cleaner codebase.


export async function getUser(userId: string) {
  const res = await fetch(`${process.env.INTERNAL_URL}/users/${userId}`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}
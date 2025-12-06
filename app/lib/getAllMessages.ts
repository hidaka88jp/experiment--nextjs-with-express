export type Message = {
  id: number;
  message: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    name: string;
  };
};

export async function getAllMessages(): Promise<Message[]> {
  try {
    const res = await fetch(`${process.env.INTERNAL_MESSAGES_URL}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch messages:", res.status);
      return [];
    }

    return res.json();
  } catch (err) {
    console.error("Network error while fetching messages:", err);
    return [];
  }
}
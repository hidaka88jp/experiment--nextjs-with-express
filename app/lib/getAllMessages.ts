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
  const res = await fetch(`${process.env.INTERNAL_MESSAGES_URL}`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

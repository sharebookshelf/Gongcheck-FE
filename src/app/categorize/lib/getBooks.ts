export async function getBooks() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/me/books`,
    {
      next: {
        tags: ["book"],
      },
      credentials: "include",
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function getUserBookshelf() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/me/bookshelves/images`,
    {
      next: {
        tags: ["bookshelves"],
      },
      credentials: "include",
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.statusCode);
  }

  return data;
}

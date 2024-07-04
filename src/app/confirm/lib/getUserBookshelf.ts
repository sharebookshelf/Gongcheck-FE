export async function getUserBookshelf() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/bookshelves`,
    {
      next: {
        tags: ["bookshelves"],
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

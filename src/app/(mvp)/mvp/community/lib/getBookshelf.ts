export async function getBookshelf(page: number, sorting: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/bookshelves?page=${page}&sort=${sorting}`,
    {
      next: {
        tags: ["bookshelves"],
      },
      credentials: "include",
    }
  );
  if (page !== 1) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.statusCode);
  }

  return data;
}

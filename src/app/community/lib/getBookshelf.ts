// export async function getBookshelf() {
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/book/bookshelf`,
//     {
//       next: {
//         tags: ["bookshelves"],
//       },
//       credentials: "include",
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   return response.json();
// }
export async function getBookshelf(page: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/bookshelf?page=${page}`,
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

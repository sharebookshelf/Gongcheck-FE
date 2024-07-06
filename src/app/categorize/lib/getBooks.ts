export async function getBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
    next: {
      tags: ["book"],
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

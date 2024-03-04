export async function getBooks() {
  const response = await fetch("http://localhost:3000/book", {
    next: {
      tags: ["books"],
    },
    cache: "no-store",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("서버에서 요청을 처리할 수 없습니다.");
  }
  return response.json();
}

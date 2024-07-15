// 선택된 bookId에 따라 배경 색상 결정
export const getBackgroundColor = (index: number) => {
  // const index = selectedBookIds.indexOf(bookId);
  switch (index) {
    case 0:
      return "bg-orange-50"; // 첫 번째 선택
    case 1:
      return "bg-orange-50"; // 두 번째 선택
    case 2:
      return "bg-orange-50"; // 세 번째 선택
    case 3:
      return "bg-orange-50"; // 세 번째 선택
    case 4:
      return "bg-orange-50"; // 세 번째 선택
    default:
      return "bg-transparent"; // 선택되지 않음
  }
};

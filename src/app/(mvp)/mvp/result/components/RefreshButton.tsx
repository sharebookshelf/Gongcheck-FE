export const RefreshButton = () => (
  <button
    onClick={() => window.location.reload()}
    className="bg-gray-400 text-white cursor-pointer p-2"
  >
    새로고침
  </button>
);

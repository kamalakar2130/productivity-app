export default function CloseIcon() {
  return (
    <svg
      className="w-6 h-6 text-white hover:text-red-500 hover:bg-[#fff] cursor-pointer"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

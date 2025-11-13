import { exportToExcel } from "@/utils/exportToExcel";

export default function ExportXl({ users }) {
  const handleClick = (e) => {
    exportToExcel(users, "leadDataSheet.xlsx");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-x-4 text-sm text-neutral-800 border border-neutral-800 hover:bg-neutral-200 shadow-md h-full rounded cursor-pointer px-3 py-2.5 transition-all"
    >
      <span className="block">EXPORT</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          fill="currentColor"
          d="M11.78 5.841a.75.75 0 0 1-1.06 0l-1.97-1.97v7.379a.75.75 0 0 1-1.5 0V3.871l-1.97 1.97a.75.75 0 0 1-1.06-1.06l3.25-3.25L8 1l.53.53l3.25 3.25a.75.75 0 0 1 0 1.061ZM2.5 9.75a.75.75 0 0 0-1.5 0V13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9.75a.75.75 0 0 0-1.5 0V13a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V9.75Z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}

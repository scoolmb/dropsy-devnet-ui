import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export default function BackButton({
  onClick,
  label = "Back to Options",
}: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-gray-400 transition-all hover:border-gray-700 hover:bg-gray-800/50 hover:text-gray-300"
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      {label}
    </button>
  );
}

import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import CardWrapper from "@/components/card/card-wrapper";

interface UseCaseCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  useCases: string[];
  children?: ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline";
}

export default function UseCaseCard({
  title,
  description,
  icon: Icon,
  useCases,
  children,
  onClick,
  variant = "default",
}: UseCaseCardProps) {
  return (
    <CardWrapper
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-6 transition-all hover:scale-[1.02] ${
        variant === "default"
          ? "border-gray-800 bg-gray-900/50 hover:border-gray-700 hover:bg-gray-900/80"
          : "border-blue-800 bg-blue-900/20 hover:border-blue-700 hover:bg-blue-900/40"
      }`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
      </div>

      <p className="mb-4 text-gray-400">{description}</p>

      <div className="mb-6 flex gap-2 items-center">
        <div
          className={`rounded-lg p-2 ${
            variant === "default" ? "bg-gray-800" : "bg-blue-900/30"
          }`}
        >
          <Icon
            className={`h-16 w-16 ${
              variant === "default" ? "text-gray-300" : "text-blue-400"
            }`}
          />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium text-gray-500">Use Cases:</h4>
          <ul className="space-y-1">
            {useCases.map((useCase, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-gray-300"
              >
                <div className="h-1 w-1 rounded-full bg-gray-600" />
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {children}
    </CardWrapper>
  );
}

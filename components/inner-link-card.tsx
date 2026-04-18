import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

export interface LinkCardProps {
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  link: string;
  /** Optional icon component from lucide-react */
  icon?: LucideIcon;
  /** Card click handler */
  onClick?: () => void;
  /** Optional color variant */
  variant?: "default" | "primary" | "secondary" | "accent";
  /** Optional tag/label */
  tag?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Optional background glow effect */
  glow?: boolean;
}

const LinkCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  variant = "default",
  link,
  tag,
  disabled = false,
  glow = true,
}: LinkCardProps) => {
  const variantClasses = {
    default:
      "bg-linear-to-br from-gray-500/50 to-white dark:from-black/50 dark:to-black",
    primary:
      "bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-700/50",
    secondary:
      "bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-700/50",
    accent:
      "bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 border-emerald-700/50",
  };

  const glowClasses = {
    default: "hover:shadow-gray-500/10",
    primary: "hover:shadow-blue-500/20",
    secondary: "hover:shadow-purple-500/20",
    accent: "hover:shadow-emerald-500/20",
  };

  const iconColors = {
    default: "text-gray-400",
    primary: "text-blue-400",
    secondary: "text-purple-400",
    accent: "text-emerald-400",
  };

  return (
    <Link href={link}>
      <Card
        className={`
        relative
        overflow-hidden
        border
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-2xl
        ${variantClasses[variant]}
        ${glow && glowClasses[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        group
      `}
        onClick={disabled ? undefined : onClick}
      >
        {/* Background Glow Effect */}
        {glow && (
          <div
            className={`
          absolute
          inset-0
          bg-linear-to-r
          from-transparent
          via-white/5
          to-transparent
          -translate-x-full
          group-hover:translate-x-full
          transition-transform
          duration-1000
        `}
          />
        )}

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid opacity-30" />

        {/* Tag Badge */}
        {tag && (
          <div
            className={`
          absolute
          top-3
          right-3
          px-2
          py-1
          rounded-full
          text-xs
          font-medium
          backdrop-blur-sm
          ${
            variant === "default"
              ? "bg-gray-800/80 text-gray-300"
              : variant === "primary"
                ? "bg-blue-900/50 text-blue-300"
                : variant === "secondary"
                  ? "bg-purple-900/50 text-purple-300"
                  : "bg-emerald-900/50 text-emerald-300"
          }
        `}
          >
            {tag}
          </div>
        )}

        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {Icon && (
                <div
                  className={`
                p-2
                rounded-lg
                backdrop-blur-sm
                bg-white/5
                border
                border-white/10
                ${iconColors[variant]}
              `}
                >
                  <Icon size={40} />
                </div>
              )}
              <CardTitle className="text-white font-semibold">
                {title}
              </CardTitle>
            </div>
            <ArrowRight
              size={20}
              className={`
              transition-transform
              duration-300
              group-hover:translate-x-1
              ${iconColors[variant]}
              ${disabled ? "opacity-40" : ""}
            `}
            />
          </div>
        </CardHeader>

        <CardContent className="p-">
          <p
            className={`
          text-sm
          ${
            variant === "default"
              ? "text-gray-400"
              : variant === "primary"
                ? "text-blue-300/80"
                : variant === "secondary"
                  ? "text-purple-300/80"
                  : "text-emerald-300/80"
          }
        `}
          >
            {description}
          </p>

          {/* Hover Indicator Line */}
          <div
            className={`
          mt-4
          h-0.5
          w-0
          group-hover:w-full
          transition-all
          duration-300
          ${
            variant === "default"
              ? "bg-gray-500"
              : variant === "primary"
                ? "bg-blue-500"
                : variant === "secondary"
                  ? "bg-purple-500"
                  : "bg-emerald-500"
          }
        `}
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default LinkCard;

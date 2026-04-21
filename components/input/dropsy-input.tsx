import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Globe, Info, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropsyInputProps extends React.ComponentProps<"input"> {
  label?: string;
  icon?: React.ReactNode;
  readAbout?: {
    title: string;
    description: string;
  };
  showInfoIcon?: boolean;
}

const DropsyInput = React.forwardRef<HTMLInputElement, DropsyInputProps>(
  (
    {
      className,
      type = "text",
      label = "Website",
      icon = <Globe className="w-4 h-4" />,
      readAbout,
      showInfoIcon = !!readAbout,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showInfoCard, setShowInfoCard] = useState(false);
    const inputId =
      id || `dropsy-input-${Math.random().toString(36).substr(2, 9)}`;

    const hasValue = props.value && props.value.toString().trim() !== "";
    const shouldLabelFloat = isFocused || hasValue;

    return (
      <div className="relative w-full">
        {/* Input container */}
        <div className="relative">
          {/* Label that floats up */}
          <Label
            htmlFor={inputId}
            className={cn(
              "absolute left-3 flex items-center gap-2 text-sm font-medium",
              "text-gray-500 dark:text-gray-400 transition-all duration-200",
              "cursor-text pointer-events-none",
              shouldLabelFloat
                ? "-top-2 text-xs border-2 bg-white dark:bg-gray-800 rounded-xs  px-2 rounded-t"
                : "top-3 hidden"
            )}
          >
            {icon}
            {label}
          </Label>

          {/* Input field */}
          <Input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              "rounded-lg border-2 pt-8 pb-8 px-3",
              "transition-all duration-200",
              isFocused
                ? "border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20"
                : "border-gray-200 dark:border-gray-700",
              className
            )}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {/* Info icon - only shows when readAbout is provided */}
          {showInfoIcon && readAbout && (
            <div className="relative">
              <button
                type="button"
                className="absolute right-3 -top-8 -translate-y-1/2"
                onMouseEnter={() => setShowInfoCard(true)}
                onMouseLeave={() => setShowInfoCard(false)}
                onClick={() => setShowInfoCard(!showInfoCard)}
              >
                <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
              </button>

              {/* Info card that appears on hover */}
              {showInfoCard && (
                <div
                  className="absolute right-0 top-full mt-2 z-50 w-64 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  onMouseEnter={() => setShowInfoCard(true)}
                  onMouseLeave={() => setShowInfoCard(false)}
                >
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {readAbout.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {readAbout.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

DropsyInput.displayName = "DropsyInput";

export default DropsyInput;

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface AIAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

export const AIAvatar = ({ size = "md", className, animated = true }: AIAvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={cn(
        "rounded-2xl bg-gradient-to-br from-primary via-wellness to-accent flex items-center justify-center shadow-lg",
        sizeClasses[size],
        animated && "animate-float",
        className
      )}
    >
      <Sparkles className={cn("text-primary-foreground", iconSizes[size])} />
    </div>
  );
};

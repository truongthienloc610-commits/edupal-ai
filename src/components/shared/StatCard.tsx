import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "wellness" | "accent";
  className?: string;
}

const variantStyles = {
  default: "bg-card",
  primary: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20",
  success: "bg-gradient-to-br from-success/10 to-success/5 border-success/20",
  wellness: "bg-gradient-to-br from-wellness/10 to-wellness/5 border-wellness/20",
  accent: "bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20",
};

const iconStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/20 text-primary",
  success: "bg-success/20 text-success",
  wellness: "bg-wellness/20 text-wellness",
  accent: "bg-accent/20 text-accent",
};

export const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  variant = "default",
  className,
}: StatCardProps) => {
  return (
    <Card
      className={cn(
        "p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1 text-foreground">{value}</p>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-success" : "text-destructive"
                )}
              >
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
              <span className="text-xs text-muted-foreground">so với tuần trước</span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center",
              iconStyles[variant]
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

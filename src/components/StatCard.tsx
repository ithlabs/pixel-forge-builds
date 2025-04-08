
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              <div
                className={cn(
                  "text-xs font-medium rounded-full px-2 py-0.5",
                  trend === "up" && "bg-green-100 text-green-800",
                  trend === "down" && "bg-red-100 text-red-800",
                  trend === "neutral" && "bg-gray-100 text-gray-800"
                )}
              >
                {trendValue}
              </div>
            </div>
          )}
        </div>
        {Icon && (
          <div className="bg-construction-orange bg-opacity-10 p-3 rounded-full">
            <Icon className="h-5 w-5 text-construction-orange" />
          </div>
        )}
      </div>
    </Card>
  );
};

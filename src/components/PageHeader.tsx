
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const PageHeader = ({ title, description, className }: PageHeaderProps) => {
  return (
    <div className={cn("mb-8", className)}>
      <h1 className="text-2xl md:text-3xl font-bold text-construction-navy">{title}</h1>
      {description && <p className="text-gray-500 mt-1">{description}</p>}
    </div>
  );
};

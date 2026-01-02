import { Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { icon: 20, text: "text-lg" },
  md: { icon: 28, text: "text-xl" },
  lg: { icon: 36, text: "text-2xl" },
};

import { useApp } from "@/contexts/AppContext";

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const { icon, text } = sizeMap[size];
  const { settings } = useApp(); // Access global settings

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <div className="relative bg-primary p-2 rounded-xl">
          <Dumbbell size={icon} className="text-primary-foreground" />
        </div>
      </div>
      {showText && (
        <span className={cn("font-display font-bold tracking-tight", text)}>
          {/* Affiche le nom personnalisé */}
          <span className="gradient-text">{settings.gymName}</span>
        </span>
      )}
    </div>
  );
}

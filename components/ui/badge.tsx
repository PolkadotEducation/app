import React, { ReactNode } from "react";

interface BadgeProps {
  color?: string;
  size?: "small" | "medium" | "large";
  className?: string;
  children: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  color = "bg-primary",
  size = "medium",
  className = "",
}) => {
  const sizeClasses = {
    small: "text-xs px-2 py-0.5",
    medium: "text-sm px-3 py-1",
    large: "text-md px-4 py-1.5",
  };

  return (
    <span
      className={`inline-flex items-center w-fit text-white rounded-full ${sizeClasses[size]} ${color} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

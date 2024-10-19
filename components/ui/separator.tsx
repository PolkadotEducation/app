interface SeparatorProps {
  marginY?: string;
  marginX?: string;
}

export default function Separator({ marginY = "my-0", marginX = "mx-0" }: SeparatorProps) {
  return <div className={`w-full border-t border-border-gray ${marginY} ${marginX}`}></div>;
}

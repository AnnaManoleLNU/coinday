import { cn } from "@/lib/utils";

export default function StatusDot({ active }: { active: boolean }) {
  return (
    <span className="relative inline-block h-2 w-2">
      {active && (
        <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-60" />
      )}
      <span
        className={cn(
          "absolute inset-0 rounded-full",
          active ? "bg-green-500" : "bg-gray-400"
        )}
      />
    </span>
  );
}
import { cn } from "@/lib/utils";

const TYPE_COLORS: Record<string, string> = {
  CS: "bg-info/15 text-info border-info/30",
  PFD: "bg-accent text-accent-foreground border-border",
  WARRANT: "bg-destructive/15 text-destructive border-destructive/30",
  RIGHT: "bg-success/15 text-success border-success/30",
  BOND: "bg-muted text-muted-foreground border-border",
  ETF: "bg-primary/15 text-primary border-primary/30",
  ETN: "bg-primary/15 text-primary border-primary/30",
  ETV: "bg-primary/15 text-primary border-primary/30",
  SP: "bg-muted text-muted-foreground border-border",
  ADRC: "bg-warning/15 text-warning border-warning/30",
  ADRP: "bg-warning/15 text-warning border-warning/30",
  ADRW: "bg-warning/15 text-warning border-warning/30",
  ADRR: "bg-warning/15 text-warning border-warning/30",
  FUND: "bg-primary/15 text-primary border-primary/30",
  BASKET: "bg-muted text-muted-foreground border-border",
  UNIT: "bg-warning/15 text-warning border-warning/30",
  LT: "bg-muted text-muted-foreground border-border",
  OS: "bg-info/15 text-info border-info/30",
  GDR: "bg-warning/15 text-warning border-warning/30",
  OTHER: "bg-muted text-muted-foreground border-border",
  NYRS: "bg-info/15 text-info border-info/30",
  AGEN: "bg-muted text-muted-foreground border-border",
  EQLK: "bg-muted text-muted-foreground border-border",
  ETS: "bg-primary/15 text-primary border-primary/30",
  IX: "bg-primary/15 text-primary border-primary/30",
};

export default function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded border px-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider",
        TYPE_COLORS[type] ?? "bg-muted text-muted-foreground border-border",
      )}
    >
      {type}
    </span>
  );
}
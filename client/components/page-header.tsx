import Link from "next/link";

type Props = {
  title: string;
  backHref?: string;
  backLabel?: string;
  rightSlot?: React.ReactNode;
};

export function PageHeader({
  title,
  backHref = "/",
  backLabel = "Back",
  rightSlot,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
      <div className="flex items-center gap-3">
        {rightSlot}
        <Link href={backHref} className="text-sm text-slate-400 hover:text-white">
          {backLabel}
        </Link>
      </div>
    </div>
  );
}

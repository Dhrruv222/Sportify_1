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
      <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
      <div className="flex items-center gap-3">
        {rightSlot}
        <Link href={backHref} className="text-sm text-zinc-600 hover:text-zinc-900">
          {backLabel}
        </Link>
      </div>
    </div>
  );
}

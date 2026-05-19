export default function Text({
  children,
  variant = "default",
  className = "",
}) {
  const variants = {
    muted: "text-sm font-inter text-zinc-500",
    small: "text-xs font-inter text-zinc-400",
    default: "text-base font-inter text-zinc-700",
    bold: "font-semibold font-inter text-zinc-900",
  };

  return <p className={`${variants[variant]} ${className}`}>{children}</p>;
}

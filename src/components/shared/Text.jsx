export default function Text({
  children,
  variant = "default",
  className = "",
}) {
  const variants = {
    muted: "text-sm text-[#F3F3F3]",
    small: "text-xs text-[#F3F3F3]",
    default: "text-base text-slate-700",
    bold: "font-semibold text-slate-900",
  };

  return <p className={`${variants[variant]} ${className}`}>{children}</p>;
}

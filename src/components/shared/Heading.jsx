export default function Heading({ children, level = "h1", className = "" }) {
  const styles = {
    h1: "text-2xl font-syne font-bold text-slate-900",
    h2: "text-xl font-semibold font-syne text-slate-800",
    h3: "text-lg font-semibold font-syne text-slate-700",
  };
  return <div className={`${styles[level]} ${className}`}>{children}</div>;
}

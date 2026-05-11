export default function Heading({ children, level = "h1", classname = "" }) {
  const styles = {
    h1: "text-2xl font-bold text-slate-900",
    h2: "text-xl font-semibold text-slate-800",
    h3: "text-lg font-semibold text-slate-700",
  };
  return <div className={`${styles[level]} ${classname}`}>{children}</div>;
}

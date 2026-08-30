import useScrollReveal from "../hooks/useScrollReveal";

// Wrap any section in <Reveal> to make it fade + slide up the first time
// it scrolls into view. Respects prefers-reduced-motion automatically
// via the CSS in index.css.
export default function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
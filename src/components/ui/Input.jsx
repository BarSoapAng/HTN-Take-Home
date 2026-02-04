export default function Input({ className = "", style = {}, ...props }) {
  return (
    <input
      className={`small-text rounded-xl w-full border border-black/15 px-4 py-2 outline-none focus:translate-y-[-1px] focus:shadow-sm ${className}`}
      style={{ backgroundColor: "white", ...style }}
      {...props}
    />
  );
}

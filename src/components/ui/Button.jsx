export default function Button({ className = "", style = {}, ...props }) {
  return (
    <button
      className={`small-text rounded-xl px-5 py-1 transition disabled:opacity-60 enabled:hover:cursor-pointer enabled:hover:translate-y-[-1px] enabled:hover:shadow-sm ${className}`}
      style={style}
      {...props}
    />
  );
}

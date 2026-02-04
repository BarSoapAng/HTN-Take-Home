export default function Button({
  className = "",
  style = {},
  href,
  target,
  rel,
  disabled = false,
  type,
  onClick,
  ...props
}) {
  const baseClass = `small-text rounded-xl px-5 py-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--black)] disabled:opacity-60 enabled:hover:cursor-pointer enabled:hover:translate-y-[-1px] enabled:hover:shadow-sm ${className}`;

  if (href) {
    const handleClick = disabled ? (event) => event.preventDefault() : onClick;

    return (
      <a
        href={disabled ? undefined : href}
        target={target}
        rel={rel}
        onClick={handleClick}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : props.tabIndex}
        className={baseClass}
        style={style}
        {...props}
      />
    );
  }

  return (
    <button
      type={type ?? "button"}
      className={baseClass}
      style={style}
      disabled={disabled}
      onClick={onClick}
      {...props}
    />
  );
}

function Button({ children, variant = "primary", size = "md", className = "", type = "button", ...props }) {
  const baseClass = "btn";
  const variantClass =
    variant === "primary" ? "btn-primary" : variant === "secondary" ? "btn-secondary" : "btn-ghost";
  const sizeClass = size === "lg" ? "btn-lg" : "";

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
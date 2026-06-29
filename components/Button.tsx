interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-8 py-4 text-sm md:text-base font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-black text-white hover:bg-neutral-800 hover:scale-105 shadow-lg",
    secondary:
      "border border-black text-black hover:bg-black hover:text-white hover:scale-105",
  };

  const className = `${baseStyles} ${variants[variant]}`;

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
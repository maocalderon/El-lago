type WaveDividerProps = {
  variant?: "dark" | "light" | "white";
};

export function WaveDivider({ variant = "light" }: WaveDividerProps) {
  const bgClass =
    variant === "dark"
      ? "bg-lago-navy"
      : variant === "white"
        ? "bg-white dark:bg-[#06111f]"
        : "bg-lago-pearl dark:bg-[#071827]";

  return (
    <div
      className={`relative -mb-1 h-14 w-full overflow-hidden sm:h-16 ${bgClass}`}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,64 L48,69.3 C96,75 192,85 288,80 C384,75 480,53 576,48 C672,43 768,53 864,58.7 C960,64 1056,64 1152,58.7 C1248,53 1344,43 1392,37.3 L1440,32 L1440,0 L1392,0 C1344,0 1248,0 1152,0 C1056,0 960,0 864,0 C768,0 672,0 576,0 C480,0 384,0 288,0 C192,0 96,0 48,0 L0,0 Z"
          className="fill-lago-ocean/[0.07]"
        />
        <path
          d="M0,64 L48,69.3 C96,75 192,85 288,80 C384,75 480,53 576,48 C672,43 768,53 864,58.7 C960,64 1056,64 1152,58.7 C1248,53 1344,43 1392,37.3 L1440,32 L1440,120 L1392,120 C1344,120 1248,120 1152,120 C1056,120 960,120 864,120 C768,120 672,120 576,120 C480,120 384,120 288,120 C192,120 96,120 48,120 L0,120 Z"
          className="fill-lago-ocean/[0.12]"
        />
      </svg>
    </div>
  );
}

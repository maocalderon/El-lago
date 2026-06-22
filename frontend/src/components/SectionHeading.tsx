type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center"
}: SectionHeadingProps) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl text-left"
      }
    >
      <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.28em] text-lago-ocean">
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M2 12 C6 6 10 14 14 10 C18 6 22 12 22 12" />
        </svg>
        {eyebrow}
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M2 12 C6 6 10 14 14 10 C18 6 22 12 22 12" />
        </svg>
      </p>
      <div className={align === "center" ? "mx-auto mt-3" : "mt-3"}>
        <h2 className="font-display text-3xl font-bold text-lago-navy sm:text-4xl dark:text-white">
          {title}
        </h2>
        <div className={"mt-4 " + (align === "center" ? "flex justify-center" : "")}>
          <div className="section-divider" />
        </div>
      </div>
      {description ? (
        <p className="mt-5 text-base leading-8 text-slate-600 dark:text-white/70">
          {description}
        </p>
      ) : null}
    </div>
  );
}

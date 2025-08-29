import { HTMLAttributes } from "react";

export function Card(props: HTMLAttributes<HTMLDivElement>) {
  const { className = "", ...rest } = props;
  return (
    <div
      className={
        "rounded-lg border border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/30 backdrop-blur-sm transition-transform duration-200 ease-out " +
        className
      }
      {...rest}
    />
  );
}

export function RingGradient(props: HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  const { className = "", children, ...rest } = props;
  return (
    <div className={"relative " + className} {...rest}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit]"
        style={{
          padding: 1,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          background:
            "linear-gradient(135deg, rgba(var(--accent),0.5), rgba(255,255,255,0))",
        }}
      />
      {children}
    </div>
  );
}

export function ButtonPrimary(props: HTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { className = "", ...rest } = props;
  return (
    <a
      className={
        "inline-flex items-center rounded px-4 py-2 text-sm text-white " +
        "bg-[rgb(var(--accent))] hover:opacity-90 shadow-sm " +
        className
      }
      {...rest}
    />
  );
}

export function ButtonOutline(props: HTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { className = "", ...rest } = props;
  return (
    <a
      className={
        "inline-flex items-center rounded px-4 py-2 text-sm border border-black/10 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 " +
        className
      }
      {...rest}
    />
  );
}



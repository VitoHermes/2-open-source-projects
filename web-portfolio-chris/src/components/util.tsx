import { HTMLAttributes } from "react";

export function Card(props: HTMLAttributes<HTMLDivElement>) {
  const { className = "", ...rest } = props;
  return (
    <div
      className={`rounded-xl border border-[rgb(var(--card-border))] bg-[rgb(var(--card-bg))] shadow-sm hover:shadow-md transition-all duration-200 ease-out ${className}`}
      style={{
        // Enable hardware acceleration
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        // Optimize for performance
        willChange: 'transform',
        // CSS variables for colors
        '--card-border': '220, 220, 220',
      } as React.CSSProperties}
      {...rest}
    />
  );
}

export function RingGradient(props: HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  const { className = "", children, ...rest } = props;
  return (
    <div className={`relative ${className}`} {...rest}>
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
            "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(20, 184, 166, 0.2))",
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
      className={`inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 ${className}`}
      {...rest}
    />
  );
}

export function ButtonOutline(props: HTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { className = "", ...rest } = props;
  return (
    <a
      className={`inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium border-2 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-0.5 ${className}`}
      {...rest}
    />
  );
}



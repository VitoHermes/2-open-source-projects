import { HTMLAttributes } from "react";

export function Card(props: HTMLAttributes<HTMLDivElement>) {
  const { className = "", ...rest } = props;
  return (
    <div
      className={`card-enhanced ${className}`}
      style={{
        // Enable hardware acceleration
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        // Optimize for performance
        willChange: 'transform',
      }}
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
            "linear-gradient(135deg, rgba(var(--primary-500),0.3), rgba(var(--accent-teal),0.2))",
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
      className={`inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[rgb(var(--primary-600))] to-[rgb(var(--primary-500))] hover:from-[rgb(var(--primary-700))] hover:to-[rgb(var(--primary-600))] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 ${className}`}
      {...rest}
    />
  );
}

export function ButtonOutline(props: HTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const { className = "", ...rest } = props;
  return (
    <a
      className={`inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium border-2 border-[rgb(var(--primary-300))] text-[rgb(var(--primary-600))] hover:bg-[rgb(var(--primary-50))] hover:border-[rgb(var(--primary-400))] transition-all duration-300 transform hover:-translate-y-0.5 ${className}`}
      {...rest}
    />
  );
}



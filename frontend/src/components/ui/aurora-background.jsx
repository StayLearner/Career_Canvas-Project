import { cn } from "@/lib/utils";
import React from "react";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen bg-slate-900 text-slate-100 transition-colors duration-500",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className={cn(
            `
            [--white-gradient:radial-gradient(at_100%_0%,hsla(0,0%,100%,0.02)_0,transparent_50%)]
            [--dark-gradient:radial-gradient(at_100%_0%,hsla(0,0%,100%,0.02)_0,transparent_50%)]
            [--aurora:repeating-linear-gradient(100deg,rgba(14,165,233,0.5)_10%,rgba(245,158,11,0.55)_15%,rgba(6,182,212,0.5)_20%,rgba(250,204,21,0.55)_25%,rgba(14,165,233,0.5)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,_50%_50%]
            filter blur-[25px] contrast-[1.15]
            absolute -inset-[10px] opacity-80
            after:content-[""] after:absolute after:inset-0
            after:[background-image:var(--white-gradient),var(--aurora)]
            after:[background-size:200%,_100%]
            after:animate-aurora after:[background-attachment:fixed]
            `,
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
          )}
        />
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

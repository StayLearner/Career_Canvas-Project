import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const GlareCard = ({
  children,
  className,
  ...props
}) => {
  const isPointerInside = useRef(false);
  const refElement = useRef(null);
  const [style, setStyle] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });

  const handlePointerMove = (event) => {
    if (!refElement.current) return;
    const element = refElement.current;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate rotation (-12 to 12 degrees)
    const rotateX = -8 * (y / rect.height - 0.5);
    const rotateY = 8 * (x / rect.width - 0.5);
    
    // Calculate glare position in percent
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setStyle({
      rotateX,
      rotateY,
      glareX,
      glareY,
      glareOpacity: 0.18,
    });
  };

  const handlePointerEnter = () => {
    isPointerInside.current = true;
  };

  const handlePointerLeave = () => {
    isPointerInside.current = false;
    setStyle({
      rotateX: 0,
      rotateY: 0,
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
    });
  };

  return (
    <div
      ref={refElement}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn(
        "relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-200 overflow-hidden",
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: isPointerInside.current ? "none" : "all 0.5s ease",
      }}
      {...props}
    >
      {/* Glare Shine Overlay Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(circle 120px at ${style.glareX}% ${style.glareY}%, rgba(255, 255, 255, 0.16), transparent)`,
          opacity: style.glareOpacity,
        }}
      />
      {/* Dynamic colorful background light reflection */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0 opacity-20"
        style={{
          background: `radial-gradient(circle 220px at ${style.glareX}% ${style.glareY}%, rgba(14, 165, 233, 0.25), rgba(245, 158, 11, 0.25), transparent)`,
          opacity: style.glareOpacity * 1.5,
        }}
      />
      <div className="relative z-20 w-full h-full">{children}</div>
    </div>
  );
};

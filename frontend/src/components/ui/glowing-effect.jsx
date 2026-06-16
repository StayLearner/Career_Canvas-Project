import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animate } from "framer-motion";

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = false,
  }) => {
    const containerRef = useRef(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef(0);
    const animationControlsRef = useRef(null);

    const handleMove = useCallback(
      (e) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.clientX ?? lastPosition.current.x;
          const mouseY = e?.clientY ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          const relX = mouseX - left;
          const relY = mouseY - top;
          element.style.setProperty("--mouse-x", `${relX}px`);
          element.style.setProperty("--mouse-y", `${relY}px`);

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          if (animationControlsRef.current) {
            animationControlsRef.current.stop();
          }

          animationControlsRef.current = animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (animationControlsRef.current) {
          animationControlsRef.current.stop();
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <div
        ref={containerRef}
        style={
          {
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--active": "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--gradient":
              variant === "white"
                ? `radial-gradient(
                    300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
                    rgba(255, 255, 255, 0.8),
                    transparent 80%
                  )`
                : `radial-gradient(
                    250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
                    #0ea5e9 0%,
                    #facc15 50%,
                    transparent 100%
                  )`,
          }
        }
        className={cn(
          "absolute inset-0 rounded-[inherit] pointer-events-none z-30",
          disabled && "!hidden"
        )}
      >
        {/* Outer Blurred Glow Shadow (Yellow + Sky Blue Accent) */}
        <div
          className={cn(
            "pointer-events-none absolute -inset-2 rounded-[inherit] opacity-100 transition-opacity blur-[16px]",
            glow && "opacity-100"
          )}
          style={
            {
              "--glowingeffect-border-width": `${borderWidth + 3}px`,
            }
          }
        >
          <div className="glowing-effect-inner-glow" />
        </div>

        {/* Crisp Border Glow */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            className
          )}
        >
          <div className="glowing-effect-inner-glow" />
        </div>
      </div>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };

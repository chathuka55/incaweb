import logoNavy from "@/assets/incasoft-logo.png";
import logoWhite from "@/assets/incasoft-logo-light.png";
import { cn } from "@/lib/utils";

/**
 * INCASOFT wordmark.
 * - `onDark`: always use the white wordmark (hero, footer and other navy surfaces).
 * - otherwise: navy wordmark in light mode, white wordmark in dark mode.
 */
export function Logo({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  const img = "h-8 w-auto select-none sm:h-9";
  return (
    <span className={cn("inline-flex items-center", className)}>
      {onDark ? (
        <img src={logoWhite} alt="INCASOFT Solutions" width={661} height={162} className={img} draggable={false} />
      ) : (
        <>
          <img src={logoNavy} alt="INCASOFT Solutions" width={661} height={162} className={cn(img, "dark:hidden")} draggable={false} />
          <img src={logoWhite} alt="INCASOFT Solutions" width={661} height={162} className={cn(img, "hidden dark:block")} draggable={false} />
        </>
      )}
    </span>
  );
}

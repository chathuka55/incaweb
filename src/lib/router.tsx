import {
  createContext,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

/**
 * Lightweight hash router — keeps every route reachable from "/" in static
 * hosting (no server rewrites needed) while supporting shareable URLs.
 */

export type Route = string; // e.g. "/", "/solutions", "/work/retail-management-platform"

function readHash(): Route {
  const raw = window.location.hash.replace(/^#/, "");
  return raw.startsWith("/") ? raw : "/";
}

const RouteContext = createContext<Route>("/");

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined" ? "/" : readHash(),
  );

  useEffect(() => {
    const onChange = () => {
      setRoute(readHash());
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return <RouteContext.Provider value={route}>{children}</RouteContext.Provider>;
}

export function useRoute(): Route {
  return useContext(RouteContext);
}

export function navigate(to: Route) {
  window.location.hash = to;
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: Route;
  children: ReactNode;
}

export function Link({ to, children, onClick, ...rest }: LinkProps) {
  return (
    <a href={`#${to}`} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}

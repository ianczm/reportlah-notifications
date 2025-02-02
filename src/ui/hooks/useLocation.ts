import { useEffect, useState } from "react";

export function useLocation() {
  const [location, setLocation] = useState<Location | null>(null);

  const onPopstate = () => {
    setLocation(window.location);
  };

  useEffect(() => {
    onPopstate();
    window.addEventListener("popstate", onPopstate);
    return () => {
      window.removeEventListener("popstate", onPopstate);
    };
  }, []);

  return location;
}

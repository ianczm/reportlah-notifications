import { useEffect, useState } from "react";

export function useLocation() {
  const [location, setLocation] = useState(() => window.location);

  const onPopstate = () => {
    setLocation(window.location);
  };

  useEffect(() => {
    window.addEventListener("popstate", onPopstate);
    return () => {
      window.removeEventListener("popstate", onPopstate);
    };
  }, []);

  return location;
}

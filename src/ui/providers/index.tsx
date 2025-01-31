import ThemingProvider from "./Theming";

import type { ReactNode } from "react";

function Providers({ children }: { children: ReactNode }) {
  return <ThemingProvider>{children}</ThemingProvider>;
}

export default Providers;

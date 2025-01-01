"use client";

import { CourierProvider } from "@trycourier/react-provider";
import { ReactNode } from "react";

function InboxLayout({ children }: { children: ReactNode }) {
  return (
    <CourierProvider
      userId="ianczm"
      clientKey={process.env.NEXT_PUBLIC_COURIER_CLIENT_KEY}
    >
      {children}
    </CourierProvider>
  );
}

export default InboxLayout;

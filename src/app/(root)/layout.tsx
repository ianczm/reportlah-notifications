import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Inter, Paytone_One } from "next/font/google";

import type { Metadata } from "next";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "../globals.css";

const primaryFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: "variable",
});

const displayFont = Paytone_One({
  variable: "--font-paytone-one",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "SG ReportLah | Food Practices",
  description: "Report food practices and get notified",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${primaryFont.variable} ${displayFont.variable} ${primaryFont.className} antialiased`}
      >
        <ColorSchemeScript defaultColorScheme="dark" />
        <MantineProvider defaultColorScheme="dark">
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}

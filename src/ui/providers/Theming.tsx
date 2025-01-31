"use client";

import {
  Button,
  createTheme,
  defaultVariantColorsResolver,
  InputBase,
  InputError,
  InputLabel,
  MantineProvider,
  VariantColorResolverResult,
  VariantColorsResolverInput,
} from "@mantine/core";

import type { ReactNode } from "react";

function variantColorResolver(
  input: VariantColorsResolverInput
): VariantColorResolverResult {
  const originalResolved = defaultVariantColorsResolver(input);

  if (input.variant === "outline") {
    return {
      ...originalResolved,
      border: "2px solid",
    };
  }

  return originalResolved;
}

const theme = createTheme({
  primaryShade: { light: 6, dark: 6 },
  primaryColor: "yellow",
  autoContrast: true,
  luminanceThreshold: 0.4,
  defaultRadius: "lg",
  cursorType: "pointer",
  components: {
    Button: Button.extend({
      defaultProps: {
        size: "xl",
        fz: "md",
        color: "yellow.6",
      },
    }),
    InputBase: InputBase.extend({
      defaultProps: {
        size: "xl",
      },
    }),
    InputLabel: InputLabel.extend({
      defaultProps: {
        fz: "md",
        mb: "xs",
        fw: "bold",
      },
    }),
    InputError: InputError.extend({
      defaultProps: {
        fz: "sm",
        lh: "sm",
      },
    }),
  },
  variantColorResolver,
});

function ThemingProvider({ children }: { children: ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      {children}
    </MantineProvider>
  );
}

export default ThemingProvider;

"use client";

import {
  Button,
  Checkbox,
  Combobox,
  ComboboxEmpty,
  createTheme,
  defaultVariantColorsResolver,
  Input,
  InputBase,
  InputError,
  InputLabel,
  MantineProvider,
  PasswordInput,
  Select,
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
        classNames: {
          root: "px-6 md:px-8 text-sm md:text-base",
        },
        color: "yellow.6",
      },
    }),
    InputBase: InputBase.extend({
      defaultProps: {
        size: "xl",
        descriptionProps: {
          fz: "sm",
          mb: "sm",
        },
      },
    }),
    Input: Input.extend({
      classNames: {
        input:
          "border-light-600 bg-white text-base font-semibold text-dark-100 placeholder:text-dark-600 focus:border-dark-400",
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        size: "xl",
      },
      classNames: {
        innerInput: "placeholder:text-dark-600",
        visibilityToggle:
          "hover:bg-dark-600/15 text-dark-600 hover:text-dark-600",
      },
    }),
    InputLabel: InputLabel.extend({
      defaultProps: {
        fz: "sm",
        mb: "xs",
        fw: "bold",
      },
    }),
    InputError: InputError.extend({
      defaultProps: {
        fz: "sm",
        mt: "sm",
      },
    }),
    Checkbox: Checkbox.extend({
      defaultProps: {
        radius: "md",
      },
      classNames: {
        input:
          "border-light-600 bg-white text-base font-semibold text-dark-100 placeholder:text-dark-600 focus:border-dark-400",
      },
    }),
    Select: Select.extend({
      defaultProps: {
        radius: "lg",
        size: "xl",
      },
      classNames: {
        dropdown:
          "border-light-600 bg-white text-base font-semibold text-dark-100 placeholder:text-dark-600 focus:border-dark-400 rounded-2xl",
        option: "hover:bg-dark-600/15 text-dark-100 text-sm rounded-xl",
        groupLabel:
          "text-xs uppercase tracking-wide text-dark-600 after:bg-dark-600",
      },
    }),
    Combobox: Combobox.extend({
      defaultProps: {
        radius: "lg",
        size: "xl",
      },
      classNames: {
        dropdown:
          "border-light-600 bg-white text-base text-dark-100 placeholder:text-dark-600 focus:border-dark-400 rounded-2xl",
        option: "hover:bg-dark-600/15 text-dark-100 text-sm rounded-xl",
      },
    }),
    ComboboxEmpty: ComboboxEmpty.extend({
      defaultProps: {
        fz: "sm",
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

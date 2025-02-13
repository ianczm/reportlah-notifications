"use client";

import { MantineColorScheme, useMantineColorScheme } from "@mantine/core";
import { ReactNode, useCallback, useEffect } from "react";

export function ColorSchemeSetter({
  colorScheme,
  children,
}: {
  colorScheme: MantineColorScheme;
  children: ReactNode;
}) {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme();

  const onMount = useCallback(() => {
    setColorScheme(colorScheme);
  }, [colorScheme, setColorScheme]);

  const onUnmount = useCallback(() => {
    clearColorScheme();
  }, [clearColorScheme]);

  useEffect(() => {
    onMount();
    return onUnmount;
  }, [onMount, onUnmount]);

  return <>{children}</>;
}

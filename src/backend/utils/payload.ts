export function getId<T extends { id: string }>(value: T | string) {
  if (typeof value === "string" || value instanceof String) {
    return value;
  }
  return value.id;
}

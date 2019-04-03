export function addSuffix(
  path: string,
  suffix: string = "no-bg",
  extension: string = "png"
): string {
  const dots = path.split(".");
  return `${dots.slice(0, -1).join(".")}-${suffix}.${extension}`;
}

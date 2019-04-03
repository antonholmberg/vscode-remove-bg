interface SuffixConfig {
  path: string;
  suffix: string;
  extension: string;
}

export function addSuffix({ path, suffix, extension }: SuffixConfig): string {
  const dots = path.split(".");
  return `${dots.slice(0, -1).join(".")}${suffix}.${extension}`;
}

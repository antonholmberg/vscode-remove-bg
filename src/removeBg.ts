import { removeBackgroundFromImageFile } from "remove.bg";

export default function removeBackground(
  apiKey: string,
  source: string,
  dest: string
) {
  return removeBackgroundFromImageFile({
    path: source,
    apiKey: apiKey,
    outputFile: dest,
    size: "regular",
    type: "auto"
  });
}

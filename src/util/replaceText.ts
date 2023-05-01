export default function replaceText(text: string): {
  fileName: string;
  path: string;
  extension: string;
  code: string;
  resume: string;
} | null {
  try {
    const [pathFileName, _extension] = text
    .split("\n")
    .join(" ")
    .split(" ")
    .filter(
      (x) => x.includes(".ts") || x.includes(".tsx") || x.includes(".css")|| x.includes(".md")
    )[0]
    .split("`")
    .join("")
    .replace(/["]/g, "")
    .replace(",", "")
    .split(".");
  const splitPathFile = pathFileName.split("/");
  const path = splitPathFile.slice(0, -1).join("/");
  const [fileName] = splitPathFile.slice(-1);
  const extension = _extension.replace(/[^a-zA-Z]/g, '')

  const code = text
    .split("```")[1]
    .replace("css\n", "")
    .replace("tsx\n", "")
    .replace("jsx\n", "")
    .replace("js\n", "")
    .replace("ts\n", "")
    .replace("typescript\n", "")
    .replace("javascript\n", "");

  const resume : string = text.split("Resume:")[1];

  return { fileName, path, extension, code, resume };
  } catch (error: any) {
    console.log(error.message)
    return null
  }
  
}

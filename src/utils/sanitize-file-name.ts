export const sanitizeFilename = (filename:string) => {
  return filename
    .replace(/[<>:"/\\|?*]/g, "")
    .replace(/\s+/g, "_")
    .trim()
    .slice(0, 100);
}
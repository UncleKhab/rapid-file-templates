export default function parsePath(path: string) {
  return path.replaceAll("\\", "/");
}

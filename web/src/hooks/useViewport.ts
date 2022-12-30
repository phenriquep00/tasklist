export function useViewport(w: number, h: number) {
  if (h > w) return "mobile";
  else return "desktop";
}

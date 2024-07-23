export const buildQuery = (obj: Record<string, any>): string => {
  const params = new URLSearchParams(obj);

  return params.toString();
};

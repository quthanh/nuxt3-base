export const buildSlug = (str?: string) => {
  if (!str) return;

  return (
    str
      .toLowerCase()
      .replace(/\s+/g, '-')
      // eslint-disable-next-line no-useless-escape
      .replace(/[^\w\-]+/g, '')
  );
};

export const useRouteQueryUrl = async (query?: any) => {
  const newQuery: Record<string, string> = {};

  for (let i = 0; i < Object.keys(query).length; i++) {
    const key = Object.keys(query)[i];
    if (query[key]) {
      newQuery[key] = query[key];
    }
  }

  const searchParams = new URLSearchParams(newQuery);
  const queryString = searchParams.toString();

  const currentUrl = window.location.href.split('?')[0];
  const newUrl = queryString ? currentUrl + '?' + queryString : currentUrl;

  return history.replaceState(null, '', newUrl);
};

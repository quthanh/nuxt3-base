export const getResponseError = (error: any) => {
  return error?.data?.error;
};

export const getResponseData = (data?: any) => {
  return data?.data;
};

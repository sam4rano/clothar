const getError = (err) =>
  err.response && err.response && err.response.data.message
    ? err.response.data.message
    : err.message;

export { getError };

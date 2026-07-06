export const buildQueryString = (params = {}) => {
    const query = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== "")
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&");
    return query ? `?${query}` : "";
  };
  
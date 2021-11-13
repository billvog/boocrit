export const truncateText = (str: string, l: number) => {
  return str.length > l ? str.substr(0, l - 1) + "…" : str;
};

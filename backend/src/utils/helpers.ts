export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const truncateString = (str: string, maxLength: number): string => {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
};
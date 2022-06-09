export const convertToDouble = (value) => {
  if (value.includes(",")) {
    return value.replace(",", ".");
  }

  return value;
};

export const shortenTitle = (title, maxLength = 60) => {
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`;
    }
    return title;
};

export const shortTableTitle = (title, maxLength = 25) => {
  if (title.length > maxLength) {
    return `${title.substring(0, maxLength)}...`;
  }
  return title;
};
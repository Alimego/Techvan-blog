export const slugify = (content) => {
    return content
      .toLowerCase()
      .replace(/ /g, '-')      // Replace spaces with hyphens
      .replace(/[^\w-]+/g, ''); // Remove all non-word characters
  };
  
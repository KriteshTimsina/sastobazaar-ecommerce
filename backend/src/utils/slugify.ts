export const slugify = (title: string): string => {
  const excludedSymbols = [".", ",", "-", "_", "%", "!", "?", "&", "#", "/", "\\"];
  const trimmedTitle = title.trim().toLowerCase();
  let slug = trimmedTitle.replace(/\s+/g, "-");
  excludedSymbols.forEach(symbol => {
    slug = slug.split(symbol).join("-");
  });

  slug = slug.replace(/^-+/, "").replace(/-+$/, "");
  return slug;
};

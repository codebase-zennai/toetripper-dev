export function parseCategoryTags(value) {
  if (!value) return [];

  if (Array.isArray(value)) {
    return Array.from(new Set(value.map((item) => String(item || '').trim()).filter(Boolean)));
  }

  if (typeof value === 'string') {
    return Array.from(
      new Set(
        value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      )
    );
  }

  return [];
}

export function formatCategoryTags(value) {
  return parseCategoryTags(value).join(', ');
}
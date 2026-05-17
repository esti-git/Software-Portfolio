interface CategoryDisplayInfo {
  nameHebrew: string;
  icon: string;
  colorClass: string;
}

export const CATEGORY_DISPLAY_LOOKUP: { [id: number]: CategoryDisplayInfo } = {
  1: {
    nameHebrew: 'הופעות חיות',
    icon: '🎤',
    colorClass: 'category-live-show'
  },
  2: {
    nameHebrew: 'סטנדאפ/קומדיה',
    icon: '😂',
    colorClass: 'category-comedy'
  },
};
export function getCategoryDisplay(categoryId: number | null): CategoryDisplayInfo {
  const defaultInfo: CategoryDisplayInfo = { nameHebrew: 'שונות', icon: '❓', colorClass: 'category-default' };
  return CATEGORY_DISPLAY_LOOKUP[categoryId ?? 0] || defaultInfo;
}
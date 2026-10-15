# Menu Translation Usage Guide

## Overview
Your menu system now supports full internationalization! All menu items will automatically translate when you change the language.

## What's Been Updated

### ✅ Components Updated
- **Sidebar Menu (demo1)**: `app/components/layouts/demo1/components/sidebar-menu.tsx`
- **Navbar Menu (demo2)**: `app/components/layouts/demo2/components/navbar-menu.tsx`
- **Navbar Menu (demo3)**: `app/components/layouts/demo3/components/navbar-menu.tsx`
- **Navbar Menu (demo5)**: `app/components/layouts/demo5/components/navbar-menu.tsx`
- **Sidebar Menu (demo8)**: `app/components/layouts/demo8/components/sidebar-menu.tsx`

### ✅ Translation Files
- **English**: `i18n/messages/en.json` - Contains all menu translations
- **Persian**: `i18n/messages/fa.json` - Contains all menu translations

## How It Works

### 1. Automatic Translation
All menu components now use the `useTranslatedMenu()` hook which automatically:
- Detects the current language
- Translates all menu items, sub-items, and collapse/expand text
- Updates when language changes

### 2. Translation Keys
Menu items are translated using keys like:
- `menu.dashboards` → "Dashboards" / "داشبوردها"
- `menu.publicProfile` → "Public Profile" / "پروفایل عمومی"
- `menu.userManagement` → "User Management" / "مدیریت کاربران"

### 3. Supported Languages
- **English (en)**: Default language
- **Persian (fa)**: RTL support included

## Usage Examples

### For New Components
```typescript
import { useTranslatedMenu } from '@/lib/use-translated-menu';

function MyMenuComponent() {
  const { menuSidebar, menuSidebarCustom } = useTranslatedMenu();
  
  return (
    <div>
      {/* Use translated menu items */}
      {menuSidebar.map(item => (
        <div key={item.title}>{item.title}</div>
      ))}
    </div>
  );
}
```

### For Custom Menu Items
```typescript
import { useTranslation } from 'react-i18next';

function CustomMenu() {
  const { t } = useTranslation();
  
  const customItems = [
    { title: t('menu.dashboards'), path: '/' },
    { title: t('menu.settings'), path: '/settings' },
  ];
  
  return <MenuComponent items={customItems} />;
}
```

## Testing Translation

### 1. Switch Language
Use your language switcher component to change between English and Persian.

### 2. Verify Translation
Check that all menu items translate correctly:
- Main menu items
- Sub-menu items
- Collapse/expand text ("Show less" / "نمایش کمتر")
- Headings ("User" / "کاربر")

### 3. RTL Support
When using Persian, verify:
- Text direction is correct (right-to-left)
- Menu alignment is proper
- Icons are positioned correctly

## Adding New Menu Items

### 1. Add to Translation Files
```json
// i18n/messages/en.json
{
  "menu": {
    "newMenuItem": "New Menu Item"
  }
}

// i18n/messages/fa.json
{
  "menu": {
    "newMenuItem": "آیتم منوی جدید"
  }
}
```

### 2. Add to Translation Keys
```typescript
// lib/menu-translation-utils.ts
const MENU_TRANSLATION_KEYS = {
  'New Menu Item': 'menu.newMenuItem',
  // ... other keys
};
```

### 3. Use in Menu Config
```typescript
// config/menu.config.tsx
{
  title: 'New Menu Item', // Will be automatically translated
  path: '/new-item',
}
```

## Troubleshooting

### Menu Not Translating
1. Check if the component is using `useTranslatedMenu()` hook
2. Verify translation keys exist in both language files
3. Ensure the translation key is added to `MENU_TRANSLATION_KEYS`

### Missing Translations
1. Add missing keys to both `en.json` and `fa.json`
2. Update `MENU_TRANSLATION_KEYS` mapping
3. Restart the development server

### RTL Issues
1. Check if the component uses RTL-aware CSS classes
2. Verify the language direction is set correctly
3. Test with Persian language to ensure proper alignment

## Performance Notes

- Translations are memoized for performance
- Menu components only re-render when language changes
- Translation keys are cached for faster lookups

## Next Steps

1. Test all menu components with both languages
2. Add any missing translations for your specific use case
3. Consider adding more languages by following the same pattern
4. Update any custom menu components to use the translation system

Your menu system is now fully internationalized! 🎉

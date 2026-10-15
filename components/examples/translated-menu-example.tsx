'use client';

import { useTranslatedMenu } from '@/lib/use-translated-menu';
import { MenuConfig } from '@/config/types';

/**
 * Example component showing how to use translated menu configurations
 * This demonstrates the proper usage of the translation system
 */
export function TranslatedMenuExample() {
  const { menuSidebar, menuSidebarCustom } = useTranslatedMenu();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Translated Menu Example</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Sidebar Menu (Translated)</h3>
        <MenuList items={menuSidebar} />
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Custom Menu (Translated)</h3>
        <MenuList items={menuSidebarCustom} />
      </div>
    </div>
  );
}

/**
 * Simple component to display menu items recursively
 */
function MenuList({ items, level = 0 }: { items: MenuConfig; level?: number }) {
  const indent = level * 20;

  return (
    <ul className="space-y-1">
      {items.map((item, index) => (
        <li key={index} style={{ marginLeft: `${indent}px` }}>
          <div className="flex items-center gap-2">
            {item.icon && <item.icon className="w-4 h-4" />}
            <span className="font-medium">{item.title}</span>
            {item.badge && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                {item.badge}
              </span>
            )}
            {item.disabled && (
              <span className="text-gray-400 text-sm">(Disabled)</span>
            )}
          </div>
          {item.children && (
            <MenuList items={item.children} level={level + 1} />
          )}
        </li>
      ))}
    </ul>
  );
}

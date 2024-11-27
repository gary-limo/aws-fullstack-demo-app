import React from 'react';
import { SidebarSection as ISidebarSection } from './types';
import { SidebarItem } from './SidebarItem';

interface Props {
  section: ISidebarSection;
  onItemClick: (itemId: string) => void;
  className?: string;
  headerComponent?: React.ReactNode;
  renderItem?: (item: ISidebarSection['items'][0]) => React.ReactNode;
}

export const SidebarSection: React.FC<Props> = ({ 
  section, 
  onItemClick, 
  className = '',
  headerComponent,
  renderItem
}) => {
  return (
    <div className={`sidebar-section ${className}`.trim()}>
      {headerComponent}
      <div className="sidebar-section-content">
        {section.items.map((item) => (
          renderItem ? (
            renderItem(item)
          ) : (
            <SidebarItem 
              key={item.id}
              item={item}
              onClick={() => onItemClick(item.id)}
            />
          )
        ))}
      </div>
    </div>
  );
}; 
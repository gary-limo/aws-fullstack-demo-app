import React from 'react';
import { SidebarItem as ISidebarItem } from './types';

interface Props {
  item: ISidebarItem;
  onClick: () => void;
}

export const SidebarItem: React.FC<Props> = ({ item, onClick }) => {
  return (
    <div 
      className={`sidebar-item ${item.isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {item.icon && <span className="sidebar-item-icon">{item.icon}</span>}
      <span className="sidebar-item-title">{item.title}</span>
      {item.count !== undefined && (
        <span className="sidebar-item-count">{item.count}</span>
      )}
    </div>
  );
}; 
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarItemProps {
  item: {
    id: string;
    title: string;
    link?: string;
    isActive?: boolean;
  };
  onClick: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ item, onClick }) => {
  return (
    <Link 
      to={item.link || `#${item.id}`}
      className={`sidebar-item ${item.isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="sidebar-item-content">
        {item.title}
      </div>
    </Link>
  );
}; 
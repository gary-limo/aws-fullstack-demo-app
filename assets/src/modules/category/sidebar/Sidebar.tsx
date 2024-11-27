import React from 'react';
import { SidebarSection as SidebarSectionComponent } from './SidebarSection';
import { SidebarSection } from './types';

interface Props {
  sections: SidebarSection[];
  onItemClick: (itemId: string) => void;
}

export const Sidebar: React.FC<Props> = ({ sections, onItemClick }) => {
  return (
    <aside className="category-sidebar">
      {sections.map((section, index) => (
        <SidebarSectionComponent
          key={index}
          section={section}
          onItemClick={onItemClick}
        />
      ))}
    </aside>
  );
}; 
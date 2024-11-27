export interface SidebarItem {
    id: string;
    title: string;
    icon?: React.ReactNode;
}

export interface SidebarSection {
    title: string;
    items: SidebarItem[];
}
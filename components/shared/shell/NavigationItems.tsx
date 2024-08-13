import Link from "next/link"

export interface MenuItem {
  name: string;
  href: string;
  icon?: any;
  active?: boolean;
  items?: Omit<MenuItem, 'icon' | 'items'>[];
  className?: string;
}

export interface NavigationProps {
  activePathname: string | null;
}

interface NavigationItemsProps {
  menus: MenuItem[];
}

interface NavigationItemProps {
  menu: MenuItem;
  className?: string;
}

const NavigationItems = ({ menus }: NavigationItemsProps) => {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {menus.map((menu) => (
        <Link
          key={menu.href}
          href={menu.href}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          {menu.name}
        </Link>
      ))}
    </nav>
  )
};


export default NavigationItems;

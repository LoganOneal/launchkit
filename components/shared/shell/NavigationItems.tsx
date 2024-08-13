import Link from 'next/link';
import classNames from 'classnames';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
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
    <>
      <Tabs defaultValue="/newdashboard" className="space-y-4">
        <TabsList>
          {menus.map((menu) => (
            <TabsTrigger
              key={menu.name}
              value={menu.href}
            >
              {menu.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
};


export default NavigationItems;

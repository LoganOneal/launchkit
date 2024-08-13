import {
  RectangleStackIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import NavigationItems from './NavigationItems';
import { MenuItem, NavigationProps } from './NavigationItems';

import {
  Home,
  LineChart,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const UserNavigation = ({ activePathname }: NavigationProps) => {
  const { t } = useTranslation('common');

  const menus: MenuItem[] = [
    {
      name: 'Teams',
      href: '/teams',
      icon: Home,
      active: activePathname === '/teams',
    },
    {
      name: t('Account'),
      href: '/settings/account',
      icon: UserCircleIcon,
      active: activePathname === '/settings/account',
    },
    {
      name: t('Security'),
      href: '/settings/security',
      icon: ShieldCheckIcon,
      active: activePathname === '/settings/security',
    },
  ];

  return <NavigationItems menus={menus} />;
};

export default UserNavigation;

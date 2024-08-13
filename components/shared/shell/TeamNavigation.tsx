import { useTranslation } from 'next-i18next';
import NavigationItems from './NavigationItems';
import { NavigationProps, MenuItem } from './NavigationItems';

import {
  LineChart, Clipboard,
  Settings
} from "lucide-react";

interface NavigationItemsProps extends NavigationProps {
  slug: string;
}

const TeamNavigation = ({ slug, activePathname }: NavigationItemsProps) => {
  const { t } = useTranslation('common');

  const menus: MenuItem[] = [
    {
      name: t('Dashboard'),
      href: `/teams/${slug}/dashboard`,
      icon: LineChart,
      active: activePathname === `/teams/${slug}/dashboard`,
    },
    {
      name: t('all-products'),
      href: `/teams/${slug}/products`,
      icon: Clipboard,
      active: activePathname === `/teams/${slug}/products`,
    },
    {
      name: t('settings'),
      href: `/teams/${slug}/settings`,
      icon: Settings,
      active: activePathname === `/teams/${slug}/settings`,
    },
  ];

  return <NavigationItems menus={menus} />;
};

export default TeamNavigation;

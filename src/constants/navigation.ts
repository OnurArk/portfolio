export type NavItem = {
  href: string;
  labelKey: string;
  subTitleKey?: string;
  icon: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", labelKey: "nav.home", subTitleKey: "nav.home.subtitle", icon: "solar:home-smile-line-duotone" },
  {
    href: "/settings",
    labelKey: "nav.settings",
    icon: "solar:settings-line-duotone",
  },
];


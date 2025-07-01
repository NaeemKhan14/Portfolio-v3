export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Naeem Khan",
  description: "Naeem Ullah Khan's personal portfolio",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "Projects",
      href: "/projects",
    },

  ],
  links: {
    github: "https://github.com/NaeemKhan14/",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

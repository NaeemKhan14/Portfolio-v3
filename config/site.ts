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
    linkedin: "https://www.linkedin.com/in/naeem-khan-/",
    github: "https://github.com/NaeemKhan14/",
  },
};

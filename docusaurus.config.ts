import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Phoenix Admin API",
  tagline: "High-performance REST API for email infrastructure",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://v3-api.docs.yukthi.net",
  baseUrl: "/",

  organizationName: "Yukthi-Systems",
  projectName: "Phoenix-Admin-API-Docs",

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/Yukthi-Systems/Phoenix-External-API-Docs/tree/main/",
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          lastVersion: "current",
          versions: {
            current: {
              label: "v1.0",
              badge: true,
            },
          },
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/logo-new.png",
    metadata: [
      {
        name: "description",
        content:
          "Reference docs for the Phoenix Admin API — a Rust/Actix REST API for email infrastructure, currently in early-stage development.",
      },
      { property: "og:title", content: "Phoenix Admin API Documentation" },
      {
        property: "og:description",
        content: "High-performance REST API for email infrastructure",
      },
      {
        property: "og:image",
        content: "https://v3-api.docs.yukthi.net/img/logo-new.png",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Phoenix Admin API Documentation" },
      {
        name: "twitter:description",
        content: "High-performance REST API for email infrastructure",
      },
      {
        name: "twitter:image",
        content: "https://v3-api.docs.yukthi.net/img/logo-new.png",
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Phoenix Admin API",
      logo: {
        alt: "Phoenix Admin API Logo",
        src: "img/logo-new.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "apiSidebar",
          position: "left",
          label: "Docs",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Getting Started",
              to: "/docs/intro",
            },
            {
              label: "API Reference",
              to: "/docs/api/health",
            },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/Yukthi-Systems/Phoenix-External-API-Docs",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Yukthi Systems. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

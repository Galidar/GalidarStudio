import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'Galidar Studio Docs',
  tagline: 'Oceanology, Riverology & Environment Packs',
  url: 'https://galidar.github.io',
  baseUrl: '/GalidarStudio/',
  favicon: 'img/logo.svg',
  i18n: { defaultLocale: 'en', locales: ['en'] },
  trailingSlash: false,

  // Keep the build passing while we finish fixing links
  onBrokenLinks: 'warn',
  // Docusaurus v4 migration: move onBrokenMarkdownLinks to markdown.hooks
  markdown: {
    hooks: { onBrokenMarkdownLinks: 'warn' }
  },

  organizationName: 'Galidar',
  projectName: 'GalidarStudio',
  deploymentBranch: 'gh-pages',

  presets: [
    [
      'classic',
      {
        // We use multi-instances of the docs plugin below
        docs: false,
        blog: {
          showReadingTime: true,
          routeBasePath: 'blog',
          blogTitle: 'Blog',
          blogDescription: 'News and release notes for Oceanology and Riverology'
        },
        theme: { customCss: require.resolve('./src/css/custom.css') }
      } satisfies Preset.Options,
    ],
  ],

  // Three docs sections: legacy, nextgen, riverology
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'legacy',
        path: 'oceanology-legacy',
        routeBasePath: 'oceanology-legacy',
        sidebarPath: require.resolve('./sidebarsLegacy.ts'),
        homePageId: 'intro'
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'nextgen',
        path: 'oceanology-nextgen',
        routeBasePath: 'oceanology-nextgen',
        sidebarPath: require.resolve('./sidebarsNextGen.ts'),
        homePageId: 'intro'
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'riverology',
        path: 'riverology',
        routeBasePath: 'riverology',
        sidebarPath: require.resolve('./sidebarsRiverology.ts'),
        homePageId: 'intro'
      },
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: ['oceanology-legacy', 'oceanology-nextgen', 'riverology'],
        language: ['en'],
        searchBarPosition: 'right',
        docsPluginIdForPreferredVersion: 'legacy'
      },
    ],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    metadata: [
      { name: 'keywords', content: 'Galidar Studio, Oceanology, Riverology, Unreal Engine, water, ocean, rivers' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:site_name', content: 'Galidar Studio Docs' },
    ],
    navbar: {
      title: 'Galidar Studio',
      logo: { alt: 'Galidar Studio', src: 'img/logo.svg' },
      items: [
        { label: 'Oceanology Legacy', to: '/oceanology-legacy/intro', position: 'left' },
        { label: 'Oceanology NextGen', to: '/oceanology-nextgen/intro', position: 'left' },
        { label: 'Riverology', to: '/riverology/intro', position: 'left' },
        { to: '/showcase', label: 'Showcase', position: 'left' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: '/community', label: 'Community', position: 'right' },
        { href: 'https://github.com/Galidar/GalidarStudio', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Oceanology Legacy', to: '/oceanology-legacy/intro'},
            {label: 'Oceanology NextGen', to: '/oceanology-nextgen/intro'},
            {label: 'Riverology', to: '/riverology/intro'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Community', to: '/community'},
            {label: 'Discord', href: 'https://discord.com/invite/bkB6XbXgYJ'},
            {label: 'Support', to: '/support'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Showcase', to: '/showcase'},
            {label: 'FAQ', to: '/faq'}
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Galidar Studio. Built with Docusaurus.`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  } as Preset.ThemeConfig,
} satisfies Config;

export default config;

import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'Galidar Studio Docs',
  tagline: 'Oceanology, Riverology, ClaudeBridge & Environment Packs',
  url: 'https://galidar.com',
  baseUrl: '/',
  favicon: 'img/logo.svg',
  i18n: { defaultLocale: 'en', locales: ['en'] },
  onBrokenLinks: 'throw',
  trailingSlash: false,

  organizationName: 'Galidar',
  projectName: 'GalidarStudio',
  deploymentBranch: 'gh-pages',


  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        blogRouteBasePath: ['roadmap'],
        docsRouteBasePath: ['oceanology-legacy', 'oceanology-nextgen', 'riverology', 'claudebridge'],
        language: ['en'],
        searchBarShortcutKeymap: 'mod+k',
        searchBarPosition: 'right',
        docsPluginIdForPreferredVersion: 'legacy'
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css'
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5
        }
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    ['@docusaurus/plugin-content-docs', { id: 'legacy', path: 'oceanology-legacy', routeBasePath: 'oceanology-legacy', sidebarPath: './sidebarsLegacy.ts' }],
    ['@docusaurus/plugin-content-docs', { id: 'default', path: 'oceanology-nextgen', routeBasePath: 'oceanology-nextgen', sidebarPath: './sidebarsNextGen.ts' }],
    ['@docusaurus/plugin-content-docs', { id: 'riverology', path: 'riverology', routeBasePath: 'riverology', sidebarPath: './sidebarsRiverology.ts' }],
    ['@docusaurus/plugin-content-docs', { id: 'claudebridge', path: 'claudebridge', routeBasePath: 'claudebridge', sidebarPath: './sidebarsClaudeBridge.ts' }],
    ['@docusaurus/plugin-content-blog', {
      id: 'roadmap',
      path: 'roadmap',
      routeBasePath: 'roadmap',
      showReadingTime: true,
      blogTitle: 'Roadmap',
      blogDescription: 'Upcoming features and release notes for Oceanology and Riverology'
    }],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    metadata: [
      { name: 'keywords', content: 'Galidar Studio, Oceanology, Riverology, ClaudeBridge, Unreal Engine, water, ocean, rivers, AI, MCP, editor tools' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:site_name', content: 'Galidar Studio Docs' },
    ],
    navbar: {
      title: 'Galidar Studio',
      items: [
        {
          type: 'dropdown',
          label: 'Products',
          position: 'left',
          items: [
            { type: 'docSidebar', sidebarId: 'nextgenSidebar', docsPluginId: 'default', label: 'Oceanology NextGen' },
            { type: 'docSidebar', sidebarId: 'legacySidebar', docsPluginId: 'legacy', label: 'Oceanology Legacy' },
            { type: 'docSidebar', sidebarId: 'riverologySidebar', docsPluginId: 'riverology', label: 'Riverology' },
            { type: 'docSidebar', sidebarId: 'claudebridgeSidebar', docsPluginId: 'claudebridge', label: 'ClaudeBridge' },
          ],
        },
        { to: '/roadmap', label: 'Roadmap', position: 'left' },
        { to: '/changelog', label: 'Changelog', position: 'left' },
        { to: '/community', label: 'Community', position: 'left' },
        { to: '/showcase', label: 'Showcase', position: 'left' },
        { to: '/support', label: 'Support', position: 'right' },
        { to: '/faq', label: 'FAQ', position: 'right' },
        { href: 'https://discord.gg/VHJGBDR2as', label: 'Discord', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Oceanology Legacy', to: '/oceanology-legacy/'},
            {label: 'Oceanology NextGen', to: '/oceanology-nextgen/'},
            {label: 'Riverology', to: '/riverology/'},
            {label: 'ClaudeBridge', to: '/claudebridge/'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Community', to: '/community'},
            {label: 'Discord', href: 'https://discord.gg/VHJGBDR2as'},
            {label: 'Support', to: '/support'},
          ],
        },
        {
          title: 'Legal',
          items: [
            {label: 'Terms', to: '/terms'},
            {label: 'Privacy', to: '/privacy'}
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'Showcase', to: '/showcase'},
            {label: 'Changelog', to: '/changelog'},
            {label: 'FAQ', to: '/faq'}
          ],
        },
      ],
      copyright: `Copyright © 2019-${new Date().getFullYear()} Galidar Studio.`,
    },
    prism: { theme: prismThemes.github, darkTheme: prismThemes.dracula },
  } as Preset.ThemeConfig,
};

export default config;

import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const config: Config = {
  title: 'Galidar Studio Docs',
  tagline: 'Oceanology, Riverology & Environment Packs',
  url: 'https://galidar.com',
  baseUrl: '/',
  favicon: 'img/logo.svg',
  i18n: { defaultLocale: 'en', locales: ['en'] },
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
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
        docsRouteBasePath: ['oceanology-legacy', 'oceanology-nextgen', 'riverology'],
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
        blog: {
          showReadingTime: true,
          routeBasePath: 'blog',
          blogTitle: 'Blog',
          blogDescription: 'News and release notes for Oceanology and Riverology'
        },
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
        { type: 'docSidebar', sidebarId: 'legacySidebar', docsPluginId: 'legacy', position: 'left', label: 'Oceanology Legacy' },
        { type: 'docSidebar', sidebarId: 'nextgenSidebar', docsPluginId: 'default', position: 'left', label: 'Oceanology NextGen' },
        { type: 'docSidebar', sidebarId: 'riverologySidebar', docsPluginId: 'riverology', position: 'left', label: 'Riverology' },
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: '/community', label: 'Community', position: 'left' },
        { to: '/showcase', label: 'Showcase', position: 'left' },
        { to: '/linked-roles', label: 'Linked Roles', position: 'right' },
        { to: '/faq', label: 'FAQ', position: 'right' },
        { to: '/support', label: 'Support', position: 'right' },
        { href: 'https://discord.gg/VHJGBDR2as', label: 'Discord', position: 'right' }
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
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Community', to: '/community'},
            {label: 'Discord', href: 'https://discord.gg/VHJGBDR2as'},
            {label: 'Support', to: '/support'},
            {label: 'Code of Conduct', to: '/code-of-conduct'},
            {label: 'Moderation', to: '/moderation'}
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

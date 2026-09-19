import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  apiSidebar: [
    'intro',
    'authentication',
    'permissions',
    'api/health/index',
    {
      type: 'category',
      label: 'Self',
      items: [
        'api/self/index',
        'api/self/who-am-i',
        'api/self/refresh',
      ],
    },
    {
      type: 'category',
      label: 'Organization',
      items: [
        'api/organization/index',
      ],
    },
    {
      type: 'category',
      label: 'Domains',
      link: {
        type: 'doc',
        id: 'api/domains/index',
      },
      items: [
        'api/domains/list',
        'api/domains/get',
        'api/domains/update',
      ],
    },
    {
      type: 'category',
      label: 'Identities',
      link: {
        type: 'doc',
        id: 'api/identities/index',
      },
      items: [
        'api/identities/list',
        'api/identities/get',
        'api/identities/update',
        'api/identities/delete',
        'api/identities/reset-password',
      ],
    },
    {
      type: 'category',
      label: 'Departments',
      link: {
        type: 'doc',
        id: 'api/departments/index',
      },
      items: [
        'api/departments/list',
        'api/departments/get',
        'api/departments/create',
        'api/departments/update',
        'api/departments/delete',
      ],
    },
  ],
};

export default sidebars;

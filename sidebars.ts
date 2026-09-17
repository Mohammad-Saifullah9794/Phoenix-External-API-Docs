import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  apiSidebar: [
    'intro',
    'authentication',
    'permissions',
    {
      type: 'category',
      label: 'API Health',
      items: [
        'api/health/index',
      ],
    },
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
      items: [
        'api/domains/index',
        'api/domains/list',
        'api/domains/get',
        'api/domains/update',
      ],
    },
    {
      type: 'category',
      label: 'Identities',
      items: [
        'api/identities/index',
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
      items: [
        'api/departments/index',
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

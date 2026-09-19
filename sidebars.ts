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
    {
      type: 'category',
      label: 'Mailboxes',
      link: {
        type: 'doc',
        id: 'api/mailbox/index',
      },
      items: [
        'api/mailbox/list',
        'api/mailbox/get',
        'api/mailbox/create',
        'api/mailbox/update',
        'api/mailbox/quota',
        'api/mailbox/delete',
      ],
    },
  ],
};

export default sidebars;

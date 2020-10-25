var routes = {
  notFound: () => '/404',
  auth: () => '/auth',
  authLogin: () => '/auth/login',
  verifyUser: () => '/auth/verify',
  stacks: (user = ':user') => `/${user}`,
  stackDetails: (user = ':user', id = ':stack') => `/${user}/${id}` + (id === ':stack' ? '+' : ''),
  dashboards: (user = ':user') => `/${user}/old-d`,
  dashboardsDetails: (user = ':user', id = ':id') => `/${user}/old-d/${id}`,
  reports: (user = ':user') => `/${user}/d`,
  reportsDetails: (user = ':user', id = ':id') => `/${user}/d/${id}`,
  jobs: (user = ':user') => `/${user}/j`,
  jobsDetails: (user = ':user', id = ':id') => `/${user}/j/${id}`,
  settings: () => '/settings'
};

export default routes;
//# sourceMappingURL=routes.modern.js.map

var routes = {
  notFound: () => '/404',
  auth: () => '/auth',
  authLogin: () => '/auth/login',
  verifyUser: () => '/auth/verify',
  stacks: (user = ':user') => `/${user}`,
  stackDetails: (user = ':user', id = ':stack') => `/${user}/${id}` + (id === ':stack' ? '+' : ''),
  dashboards: (user = ':user') => `/${user}/d`,
  dashboardsDetails: (user = ':user', id = ':id') => `/${user}/d/${id}`,
  settings: () => '/settings'
};

export default routes;
//# sourceMappingURL=routes.modern.js.map

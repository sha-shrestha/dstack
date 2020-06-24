export default {
    notFound: () => '/404',
    auth: () => '/auth',
    authLogin: () => '/auth/login',
    verifyUser: () => '/auth/verify',

    // stacks
    stacks: (user = ':user') => `/${user}`,
    stackDetails: (user = ':user', id = ':stack') => `/${user}/${id}` + (id === ':stack' ? '+' : ''),

    // dashboard
    dashboards: (user = ':user') => `/${user}/d`,
    dashboardsDetails: (user = ':user', id = ':id') => `/${user}/d/${id}`,

    // settings
    settings: () => '/settings',
};

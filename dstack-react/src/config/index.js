export default {
    API_URL: '/api',
    GA_ID: '',
    DOCS_URL: 'http://docs.dstack.ai',

    LOGIN_URL: '/users/login',
    VERIFY_EMAIL_URL: '/users/verify',

    USER_DATA_URL: '/users/remember',
    UPDATE_TOKEN_URL: '/users/update/token',
    UPDATE_SETTINGS_URL: '/users/update/settings',
    CHECK_USER: userName => `/users/exists/${userName}`,

    STACKS_LIST: userName => `/stacks/${userName}`,
    DELETE_STACK: () => '/stacks/delete',
    STACK_DETAILS: (userName, stack) => `/stacks/${userName}/${stack}`,
    STACK_FRAME: (userName, stack, frameId) => `/frames/${userName}/${stack}/${frameId}`,
    STACK_ATTACHMENT: (stack, frameId, id) => `/attachs/${stack}/${frameId}/${id}`,
    STACK_UPDATE: '/stacks/update',
    STACK_PUSH: '/stacks/push',

    DASHBOARD_LIST: userName => `/dashboards/${userName}`,
    DASHBOARD_DETAILS: (userName, id) => `/dashboards/${userName}/${id}`,
    DASHBOARD_CREATE: '/dashboards/create',
    DASHBOARD_UPDATE: '/dashboards/update',
    DASHBOARD_DELETE: '/dashboards/delete',
    DASHBOARD_CARDS_INSERT: '/dashboards/cards/insert',
    DASHBOARD_CARDS_UPDATE: '/dashboards/cards/update',
    DASHBOARD_CARDS_DELETE: '/dashboards/cards/delete',

    DISCORD_URL: 'https://discord.gg/8xfhEYa',
    TWITTER_URL: 'https://twitter.com/dstackai',
    GITHUB_URL: ' https://github.com/dstackai',
    MEDIUM_URL: ' https://medium.com/dstackai',

    CONFIGURE_PYTHON_COMMAND: (token = '<token>', userName = '<username>') => {
        const origin = window ? window.location.origin : '';

        return `dstack config --token ${token} --user ${userName} --server ${origin}/api`;
    },

    CONFIGURE_R_COMMAND: (token = '<token>', userName = '<username>') => {
        const origin = window ? window.location.origin : '';

        return `dstack::configure(user = "${userName}", token = "${token}", persist = "global"`
            + `, server = "${origin}/api")`;
    },
};

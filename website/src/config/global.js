const production = {
    APP_URL: 'https://dstack.ai',
    API_URL: 'https://api.dstack.ai',
    GA_ID: 'UA-4493451-5',
};

const staging = {
    APP_URL: 'https://stgn.dstack.ai',
    API_URL: 'https://api.stgn.dstack.ai',
    GA_ID: '',
};

const host = {
    API_URL: '/api',
    GA_ID: '',

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

export default {
    APP_URL: 'http://localhost:3000',
    API_URL: 'https://api.stgn.dstack.ai',
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

    CONFIGURE_PYTHON_COMMAND: (token = '<token>', userName = '<username>') => (
        `dstack config --token ${token} --user ${userName}`
    ),

    CONFIGURE_R_COMMAND: (token = '<token>', userName = '<username>') => (
        `dstack::configure(user = "${userName}", token = "${token}", persist = "global")`
    ),

    ...(process.env.REACT_APP_STAGE === 'production' ? production : {}),
    ...(process.env.REACT_APP_STAGE === 'staging' ? staging : {}),
    ...(process.env.REACT_APP_STAGE === 'host' ? host : {}),
};
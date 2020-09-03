import {config} from '@dstackai/dstack-react';

export default {
    ...config,
    API_URL: '/api',
    GA_ID: '',

    CONFIGURE_PYTHON_COMMAND: (token = '<token>', userName = '<username>') => {
        const origin = window ? window.location.origin : '';

        return `dstack config add --token ${token} --user ${userName} --server ${origin}/api`;
    },

    CONFIGURE_R_COMMAND: (token = '<token>', userName = '<username>') => {
        const origin = window ? window.location.origin : '';

        return `dstack::configure(user = "${userName}", token = "${token}", persist = "global"`
            + `, server = "${origin}/api")`;
    },
};
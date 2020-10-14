import api from 'api';
import config from 'config';

export const fetchJob = ({user, id}) => {
    return new Promise(async resolve => {
        try {
            const request = await api.get(config.JOB_DETAILS(user, id));

            resolve(request.data);
        } catch (e) {
            resolve({});
        }
    });
};

export const runJob = params => {
    return new Promise(async resolve => {
        try {
            const request = await api.post(config.JOB_RUN, params);

            resolve(request.data);
        } catch (e) {
            resolve({});
        }
    });
};

export const stopJob = params => {
    return new Promise(async resolve => {
        try {
            const request = await api.post(config.JOB_STOP, params);

            resolve(request.data);
        } catch (e) {
            resolve({});
        }
    });
};